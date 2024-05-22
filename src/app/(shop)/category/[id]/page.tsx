import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";


const seedProduct = initialData.products

interface Props {
  params:{
    id:Category
  }
}


export default function({params}:Props) {

  const {id} = params

  const products = seedProduct.filter(product=>product.gender===id)

  const labels:Record<Category, string> = {
    'men':'para hombres',
    'women':'para mujeres',
    'kid':'para niños',
    'unisex':'para todos'
  }

  // if (id==='kids'){
  //   notFound()
  // }



    return (
      <>
      <Title title={`Tienda ${labels[id]}`} subtitle="Todos los productos" className="mb-2"/>
      <ProductGrid products={products}/>
      </>
    );
  }