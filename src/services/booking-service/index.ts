import { notFoundError, forbiddenError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingsRepository from '@/repositories/bookings-repository ';
import roomsRepository from '@/repositories/rooms-repository';

async function getBookings(userId: number) {
  const bookings = await bookingsRepository.getBookingsByUserId(userId);
  if (!bookings) throw notFoundError();

  return {
    id: bookings.id,
    Room: {
      id: bookings.Room.id,
      name: bookings.Room.name,
      capacity: bookings.Room.capacity,
      hotelId: bookings.Room.hotelId,
      createdAt: bookings.Room.createdAt,
      updatedAt: bookings.Room.updatedAt,
    },
  };
}

async function postBookings(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (tickets.status !== 'PAID') throw forbiddenError();
  if (tickets.TicketType.isRemote) throw forbiddenError();
  if (!tickets.TicketType.includesHotel) throw forbiddenError();

  const room = await roomsRepository.getRoomByRoomId(roomId);
  if (!room) throw notFoundError();
  if (room.capacity === room.Booking.length) throw forbiddenError();

  await bookingsRepository.postBookings(userId, room.id);
  const booking = await bookingsRepository.getBookingsByUserId(userId);
  return {
    bookingId: booking.id,
  };
}

async function updateBookings(roomId: number, bookingId: number) {
  const booking = await bookingsRepository.getBookingsByBookingId(bookingId);
  if (!booking) throw forbiddenError();

  const room = await roomsRepository.getRoomByRoomId(roomId); //novo quarto
  if (!room) throw notFoundError();
  if (room.capacity === room.Booking.length) throw forbiddenError();

  const newBooking = await bookingsRepository.updateRoomIdOfBooking(bookingId, roomId);
  return {
    bookingId: newBooking.id,
  };
}

export default { getBookings, postBookings, updateBookings };
