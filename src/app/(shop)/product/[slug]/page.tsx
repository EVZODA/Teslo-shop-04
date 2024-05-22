
import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { MobileSlideShow, QuantitySelector, SizeSelector, SlideShow } from "@/components";


interface Props {
  params: {
    slug: string
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ params }: Props) {

  const { slug } = params

  const product = initialData.products.find(product => product.slug === slug)

  if (!product) {
    notFound()
  }


  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        {/*Mobile slideShow */}
        <MobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/*Desktop slideShow */}
        <SlideShow 
        title={product.title} 
        images={product.images} 
        className="hidden md:block"
        />

      </div>

      {/*Detalles */}
      <div className="col-span-1 px-5">

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product?.title}
        </h1>
        <p className="text-lg mb-5">${product?.price}</p>

        {/*Selector de tallas */}
        <SizeSelector availableSize={product.sizes} selectedSize={product.sizes[0]} />

        {/*Selector de cantidad */}
        <QuantitySelector quantity={3} />


        {/*Button */}

        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/*Descripcion */}

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">
          {product?.description}
        </p>

      </div>

    </div>
  );
}