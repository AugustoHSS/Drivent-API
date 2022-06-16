import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {
  createOrUpdateBooking,
} from "@/controllers";
import { createBookingSchema } from "@/schemas";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .patch("/:activityId", createOrUpdateBooking)

export { activityRouter };
