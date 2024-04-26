
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";



const style = {"layout":"vertical"};


const ButtonWrapper = ({ showSpinner, createOrder, onApprove }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                currency="PLN"
                style={style}
                disabled={false}
                forceReRender={[style]}
                fundingSource={undefined}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </>
    );
}

const Paypal = ({createOrder, onApprove}) => {
    return (
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "PLN" }}>
                <ButtonWrapper showSpinner={false} createOrder={createOrder} onApprove={onApprove}/>
            </PayPalScriptProvider>
    );
}

export default Paypal