import { Request, Response } from 'express';
import { AuthenticatedRequest } from "@/middlewares";

import httpStatus from 'http-status';

export async function createOrUpdateBooking(req: AuthenticatedRequest, res: Response) {
  const { activityId } = req.params;

  res.status(httpStatus.OK).send(activityId);
}