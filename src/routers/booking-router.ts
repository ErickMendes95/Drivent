import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookings, postBookings, updateBookings } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookings)
  .post('/', postBookings)
  .put('/:bookingId', updateBookings);

export { bookingRouter };
