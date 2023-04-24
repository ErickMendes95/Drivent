import { notFoundError, paymentRequiredError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!tickets) throw notFoundError();
  if (tickets.status !== 'PAID') throw paymentRequiredError();
  if (tickets.TicketType.isRemote) throw paymentRequiredError();
  if (!tickets.TicketType.includesHotel) throw paymentRequiredError();

  const hotels = await hotelsRepository.getAllHotels();
  if (hotels.length === 0) throw notFoundError();

  return hotels;
}

async function getHotel(userId: number, hotelId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const tickets = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!tickets) throw notFoundError();
  if (tickets.status !== 'PAID') throw paymentRequiredError();
  if (tickets.TicketType.isRemote) throw paymentRequiredError();
  if (!tickets.TicketType.includesHotel) throw paymentRequiredError();

  const hotel = await hotelsRepository.getHotel(hotelId);
  if (!hotel) throw notFoundError();

  return hotel;
}

export default { getAllHotels, getHotel };
