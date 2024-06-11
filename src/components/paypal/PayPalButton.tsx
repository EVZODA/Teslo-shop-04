'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions} from '@paypal/paypal-js'

export const PayPalButton = () => {

  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
    <div className='animate-pulse mb-10'>
      <div className='h-11 bg-gray-300 rounded'></div>
      <div className='h-11 bg-gray-300 rounded mt-2'></div>
    </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions):Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units:[
        
        {
          amount:{
            value:'100',
          }
        }
      ]
    })

    console.log(transactionId)

    return ''
  }
  


  return (
    <PayPalButtons 
    createOrder={createOrder}
    />
  )
}
