import prisma from '../lib/prisma';
import { initialData } from './seed';





async function main() {

    // Borrar registros previos

    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()


    const { categories, products } = initialData



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





    console.log("seed ejecutado correctamente")
}





(() => {

    if (process.env.NODE_ENV === "production") return

    main()

})()