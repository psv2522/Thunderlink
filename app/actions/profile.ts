'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/db'

export type ProfileData = {
    fullname: string
    username: string
    bio: string
    bgImage?: string
}

export async function saveProfile(data: ProfileData) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            throw new Error('Unauthorized')
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                userinfo: true
            }
        })

        if (!user) {
            throw new Error('User not found')
        }

        await prisma.userinfo.update({
            where: {
                id: user.id
            },
            data: {
                accountId: data.username,
                bio: data.bio || null,
                bgImage: data.bgImage === '' ? null : data.bgImage
            }
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: data.fullname
            }
        })

        revalidatePath('/profile')
        revalidatePath('/settings')

        return { success: true }
    } catch (error) {
        console.error('[SAVE_PROFILE]', error)
        throw new Error(
            error instanceof Error ? error.message : 'Failed to save profile'
        )
    }
}

export async function checkUsername(username: string) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.email) {
            throw new Error('Unauthorized')
        }

        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { userinfo: true }
        })

        if (currentUser?.userinfo?.accountId === username) {
            return { available: true }
        }

        const existingUser = await prisma.userinfo.findFirst({
            where: {
                accountId: username
            }
        })

        return { available: !existingUser }
    } catch (error) {
        console.error('[CHECK_USERNAME]', error)
        throw new Error(
            error instanceof Error ? error.message : 'Failed to check username availability'
        )
    }
} 