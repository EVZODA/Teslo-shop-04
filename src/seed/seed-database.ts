import prisma from '../lib/prisma';
import { initialData } from './seed';




async function main() {

    // Borrar registros previos
    await Promise.all([
        prisma.productImage.deleteMany(),
        prisma.product.deleteMany(),
        prisma.category.deleteMany(),
    ])

    const {categories, products} = initialData

    

    // Categorias

    const categoriesData = categories.map(name=>({name}))

    await prisma.category.createMany({
        data:categoriesData
    })

    



    const categoriesDb = await prisma.category.findMany()
    console.log(categoriesDb)

    const categoriesMap = categoriesDb.reduce((map, category)=> {

        map[category.name.toLowerCase()] = category.id

        return map
    }, {} as Record<string, string>)


    // Productos

    
    const {images, type, ...product1} = products[0]
    
    await prisma.product.create({
        
        data:{
            ...product1,
            categoryId:categoriesMap['shirts'],
            
        }
    })

   





    console.log("seed ejecutado correctamente")
}





(() => {

    if (process.env.NODE_ENV === "production") return

    main()

})()