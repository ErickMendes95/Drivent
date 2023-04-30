import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingsService from '@/services/booking-service';

export async function getBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingsService.getBookings(userId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function postBookings(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId: number = req.body.roomId;

  try {
    const booking = await bookingsService.postBookings(userId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'ForbiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function updateBookings(req: AuthenticatedRequest, res: Response) {
  const roomId: number = +req.body.roomId;
  const bookingId: number = +req.params.bookingId;

  try {
    const booking = await bookingsService.updateBookings(roomId, bookingId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'ForbiddenError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
