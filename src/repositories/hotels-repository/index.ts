import { prisma } from '@/config';

async function getAllHotels() {
  return prisma.hotel.findMany();
}

async function getHotel(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

export default { getAllHotels, getHotel };
