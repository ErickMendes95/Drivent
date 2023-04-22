import { Room } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRoom(hotelId: number): Promise<Room> {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number({ min: 2, max: 30 }),
      hotelId,
      updatedAt: faker.datatype.datetime(),
    },
  });
}
