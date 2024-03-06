import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect } from 'react'
import { usePayPalScriptReducer, PayPalButtons } from '@paypal/react-paypal-js'

const Checkout = ({ currency, amount}) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

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
            // const name = details.payer.name.given_name;
            // alert(`Transaction completed by ${name}`);

            console.log(response)

            // if (response.status === 'COMPLETED') {
            //     console.log(response)
            // }
        });
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

const Paypal = ({amount, currency}) => {
    const initialOptions = {
        clientId: 'test',
        currency: "USD",
        components: "buttons"
    };
    
    return (
        <PayPalScriptProvider options={initialOptions}>
            <Checkout amount={amount} currency={currency || 'USD'} />
        </PayPalScriptProvider>
    );
}

export default Paypal