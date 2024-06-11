'use server'

import prisma from "@/lib/prisma"


export const deleteUserAddress = async (userId: string) => {
    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })


        if (!storedAddress) return

        const deleteAddress = await prisma.userAddress.delete({
            where: { userId },
        })

        return {
            ok: 'true',
            message: 'Direccion borrada correctamente'
        }


    } catch (error) {
        console.log(error)
        return {
            ok: 'false',
            message: 'No se pudo borrar la direccion'
        }

    }
}