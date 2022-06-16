import { notFoundError } from "@/errors";
import accommodationRepository from "@/repositories/accommodation-repository";
import {
  ActivitiesReservation
} from "@prisma/client";

export type CreateActivityReservation = Omit<ActivitiesReservation, "id">;

async function createOrUpdateBooking(bookingData: BookingData) {

  


}

const activityService = {
  createOrUpdateBooking,
};

export default activityService;
