import dayjs from 'dayjs';
import { conflictError, notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";
import {
  ActivityReservation
} from "@prisma/client";

export type CreateActivityReservation = Omit<ActivityReservation, "id">;

async function createOrUpdateBooking(bookingData: CreateActivityReservation) { 
  const { userId, activityId } = bookingData;

  if (isNaN(activityId)) throw conflictError("activity id must be a number");
  
  const activity = await activityRepository.find(activityId);
  if (!activity) throw notFoundError();

  if (activity.ActivityReservation.length >= activity.capacity)
    throw conflictError("this activity is not available");

  const existingReservation = await activityRepository.getUserReservations(userId, activityId);  
  if (existingReservation.length > 0) {
    await activityRepository.unbook(userId, activityId);
    return 'unbooked';
  }

  const userCalendar = await generateUserCalendar(userId);
  const activityStartTime = dayjs(activity.startTime).unix();
  const activityEndTime = activityStartTime + activity.duration * 60;

  for (let i = 0; i < userCalendar.length; i + 2) {
    const userActivityStartTime = userCalendar[i];
    const userActivityEndTime = userCalendar[i + 1];

    if (
      activityStartTime === userActivityStartTime ||
      activityStartTime > userActivityStartTime && activityStartTime <= userActivityEndTime ||
      activityStartTime > userActivityStartTime && activityEndTime >= userActivityEndTime ||
      activityStartTime < userActivityStartTime && activityEndTime > userActivityStartTime
      )
      throw conflictError("activities time conflict");
  }

  await activityRepository.book(userId, activityId);
  return 'booked';
}

async function generateUserCalendar(userId: number) {
  const userReservations = await activityRepository.getUserReservations(userId);

  const notAvailableTimes = [];
  for (const reserve of userReservations) {
    const startTime = dayjs(reserve.Activity.startTime).unix();
    const endTime = startTime + reserve.Activity.duration * 60;
    notAvailableTimes.push(startTime, endTime);
  }

  return notAvailableTimes;  
}

const activityService = {
  createOrUpdateBooking,
  generateUserCalendar,
};

export default activityService;
