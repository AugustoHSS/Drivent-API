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

  //verify time conflict
  await generateUserCalendar(userId);

  await activityRepository.book(userId, activityId);
  return 'booked';
}

async function generateUserCalendar(userId: number) {
  const userReservations = await activityRepository.getUserReservations(userId);
  let userCalendar: any = {};

  const dayTime = [];
  for (let i = 0; i < 30; i++)
    dayTime.push(null)

  for (const reserve of userReservations) {
    userCalendar[dayjs(reserve.Activity.startTime).format('DD/MM/YYYY')] = dayTime;
  }

  console.log(userCalendar);
  
}

const activityService = {
  createOrUpdateBooking,
  generateUserCalendar
};

export default activityService;
