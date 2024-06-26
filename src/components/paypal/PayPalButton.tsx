'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from '@paypal/paypal-js'

import { paypalCheckPayment, setTransactionId } from '@/actions'

interface Props {
  orderId: string,
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100)) / 100

  if (isPending) {
    return (
      <div className='animate-pulse mb-10'>
        <div className='h-11 bg-gray-300 rounded'></div>
        <div className='h-11 bg-gray-300 rounded mt-2'></div>
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: rountedAmount.toString()
          }
        }
      ]
    })

    const { ok } = await setTransactionId(transactionId, orderId)

    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }

    return transactionId
  }


  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {



    const detail = await actions.order?.capture()

    if (!detail) return

    await paypalCheckPayment(detail.id)

  }

  return (
    <div className='relative z-0'>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  )
}
