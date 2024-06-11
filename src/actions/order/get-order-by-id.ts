import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

    const session = await auth()

    if (!session?.user) {
        return {
            ok: false,
            message: 'El usuario debe estar auntenticado'
        }
    }

    try {

        const order = await prisma.order.findUnique({
            where: {
                id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take:1
                                }
                            }
                        }
                    }
                }
            }
        })

        if (!order) throw new Error (`El ${id} no existe`)

        if (session.user.role === 'user') {
            if(order.userId !== session.user.id) {
               throw new Error (`${id} no es de este usuario`)
            }
        }




        return {
            ok: true,
            order
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Order no existe'
        }
    }

}