import prisma from '../prisma/client.js';

export async function isGroupMember(userId: string, groupId: string): Promise<boolean> {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    select: { memberIds: true },
  });
  if (!group) return false;
  return group.memberIds.includes(userId);
}

export async function groupIdsForUser(userId: string): Promise<string[]> {
  const groups = await prisma.group.findMany({
    where: { memberIds: { has: userId } },
    select: { id: true },
  });
  return groups.map((g) => g.id);
}
