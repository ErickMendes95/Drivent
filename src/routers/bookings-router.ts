import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookings, postBookings, updateBookings } from '@/controllers/bookings-controller';

const bookingsRouter = Router();

bookingsRouter
  .all('/*', authenticateToken)
  .get('/', getBookings)
  .post('/', postBookings)
  .put('/:bookingId', updateBookings);

export { bookingsRouter };
