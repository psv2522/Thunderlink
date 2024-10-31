'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export type SocialLink = {
    baseUrl: string
    username: string
}

export async function saveLinks(links: SocialLink[]) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            throw new Error('Unauthorized')
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                userinfo: {
                    select: {
                        accountId: true
                    }
                }
            }
        })

        if (!user?.userinfo?.accountId) {
            throw new Error('User info not found')
        }

        await prisma.$transaction(async (tx) => {
            await tx.link.deleteMany({
                where: {
                    accountId: user?.userinfo?.accountId
                }
            })

            await tx.link.createMany({
                data: links.map((link) => ({
                    baseUrl: link.baseUrl,
                    username: link.username,
                    accountId: user!.userinfo!.accountId
                }))
            })
        })

        revalidatePath('/profile')

        return { success: true }
    } catch (error) {
        console.error('[SAVE_LINKS]', error)
        throw new Error(
            error instanceof Error ? error.message : 'Failed to save social links'
        )
    }
}

export async function getLinks() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            throw new Error('Unauthorized')
        }

        const userinfo = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                userinfo: {
                    select: {
                        links: {
                            select: {
                                baseUrl: true,
                                username: true
                            }
                        }
                    }
                }
            }
        })

        if (!userinfo) {
            throw new Error('User info not found')
        }

        return userinfo.userinfo?.links || []
    } catch (error) {
        console.error('[GET_LINKS]', error)
        throw new Error(
            error instanceof Error ? error.message : 'Failed to fetch social links'
        )
    }
}