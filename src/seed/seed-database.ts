import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';






async function main() {

    // Borrar registros previos
    await prisma.orderAddress.deleteMany()
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    


    await prisma.userAddress.deleteMany()
    await prisma.user.deleteMany()
    await prisma.country.deleteMany()

    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()


    const { categories, products, users } = initialData


    await prisma.user.createMany({
        data:users
    })



    // Categorias

    const categoriesData = categories.map(name => ({ name }))

    await prisma.category.createMany({
        data: categoriesData
    })





    const categoriesDb = await prisma.category.findMany()
    console.log(categoriesDb)

    const categoriesMap = categoriesDb.reduce((map, category) => {

        map[category.name.toLowerCase()] = category.id

        return map
    }, {} as Record<string, string>)


    // Productos






    products.forEach(async (product) => {

        const { type, images, ...rest } = product

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })


        // images 

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })


    })


    const countrie = countries.map(countrie => ({ 
        id:countrie.id,
        name:countrie.name
     }))

    await prisma.country.createMany({
        data: countrie
    })





    console.log("seed ejecutado correctamente")
}





(() => {

    if (process.env.NODE_ENV === "production") return

    main()

})()