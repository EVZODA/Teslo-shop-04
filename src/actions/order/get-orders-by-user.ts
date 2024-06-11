'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrdersByUser = async () => {
    const session = await auth()
    
    if (!session?.user) {
        return {
            ok:false,
            message: 'El usuario debe estar auntenticado'
        }
    }

    const orders = await prisma.order.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            OrderAddress: true
        }
    })

    return {
        ok:true,
        orders
    }
}