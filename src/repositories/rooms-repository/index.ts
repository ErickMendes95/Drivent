import { prisma } from '@/config';

async function getRoomByRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
    include: {
      Booking: true,
    },
  });
}

export default { getRoomByRoomId };
