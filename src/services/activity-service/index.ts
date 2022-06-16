import { notFoundError } from "@/errors";
import accommodationRepository from "@/repositories/accommodation-repository";
import {
  ActivityReservation
} from "@prisma/client";

export type CreateActivityReservation = Omit<ActivityReservation, "id">;

async function createOrUpdateBooking(bookingData: CreateActivityReservation) {

  


}

const activityService = {
  createOrUpdateBooking,
};

export default activityService;
