'use server'

import prisma from '@/lib/db'

export async function getUserLinks(accountId: string) {
  try {
    const links = await prisma.link.findMany({
      where: {
        accountId: accountId
      },
      select: {
        baseUrl: true,
        username: true
      }
    })
    return links
  } catch (error) {
    console.error('[GET_USER_LINKS]', error)
    return []
  }
} 