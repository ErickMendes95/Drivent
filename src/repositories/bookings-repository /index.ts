import { prisma } from '@/config';

async function getBookingsByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    },
  });
}

async function postBookings(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}

async function getBookingsByBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId },
    include: {
      Room: true,
    },
  });
}

async function updateRoomIdOfBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      roomId,
    },
  });
}

export default { getBookingsByUserId, getBookingsByBookingId, postBookings, updateRoomIdOfBooking };
