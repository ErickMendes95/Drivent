import { Hotel } from '@prisma/client';
import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel(): Promise<Hotel> {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.datatype.string(),
      updatedAt: faker.datatype.datetime(),
    },
  });
}
