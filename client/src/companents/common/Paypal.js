import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from 'react'
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js'
import swal from 'sweetalert'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import * as apis from '../../apis'
import { appSlice } from '../../store/appSlice'
import path from '../../ultis/path'

const Checkout = ({ currency, amount, products, note}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const dispatch1 = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,  
            }
        })

    }, [currency])

    const onCreateOrder = (data,actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then(async(response) => {
            if (response.status === 'COMPLETED') {
                const newArray = products.map(item => ({product: item.product._id, quantity: item.quanlity, color: item.color}))

                const dataPass = {
                    products: newArray,
                    total: amount * 24000,
                    note: note,
                }

                const result = await apis.createOrder(dataPass)
                dispatch1(appSlice.actions.setChildren(null))
                swal(result.data.success ? 'Congratulations': 'OOps', result.data.mes, result.data.success ? 'success' : 'error').then(() => {
                    navigate(`/${path.HOME}`)
                })

                if (result.data.success) {
                    const listProducts = newArray.map(item => ({pid: item.product, color: item.color}))
                    const rs = await apis.deleteProductCart({data: listProducts})
                    console.log(rs)
                }
            }
        })
    }

    return (
        <div>
            {/* {isPending ? <p>LOADING...</p> : ( */}
                <>
                    <PayPalButtons
                        style={{'layout': "vertical"}}
                        forceReRender={[currency, amount]}
                        fundingSource={undefined}
                        disabled={false}
                        createOrder={onCreateOrder}
                        onApprove={onApproveOrder}
                    >
                    </PayPalButtons>
                </>
            {/* )} */}
        </div>
    );
}

const Paypal = ({amount, currency, products, note}) => {
    const initialOptions = {
        clientId: 'test',
        currency: "USD",
        components: "buttons"
    };
    
    return (
        <PayPalScriptProvider options={initialOptions}>
            <Checkout amount={amount} products={products} note={note} currency={currency || 'USD'} />
        </PayPalScriptProvider>
    );
}

export default Paypal