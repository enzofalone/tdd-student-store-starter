import "./Receipt.css"

export default function Receipt(props) {
    // on exit button handler
    const onExitHandler = () => {
        props.setLastPurchase();
    }

    //get all products with detailed information in <li> elements
    const getShoppingCartItems = () => {
        if (props.success) {
            return (
                props?.lastReceipt?.order?.map((e) => {
                    let cartProduct = props.products.find(product => product.id === e.itemId);

                    return <li key={e.itemId} className="receipt-list-el" >{e.quantity} total {cartProduct.name} purchased at a cost of ${cartProduct.price} for a total cost of ${(cartProduct.price * e.quantity).toFixed(2)}</li>
                })
            )
        } else {
            <h1 style={{ color: "red" }}>An error has occurred!</h1>
        }
    }
    // render based on if a receipt exists
    if (props?.lastReceipt != undefined) {
        return (
            <div className="receipt">
                {/* success message */}
                <h1 style={{ color: "green" }}>{props.success ? "Success!!" : null}</h1>
                {/* receipt details */}
                <h1>{props?.lastReceipt?.message?.title}</h1>
                <h2>{props?.lastReceipt?.message?.body}</h2>
                <ul className="receipt-list">
                    {getShoppingCartItems()}
                </ul>
            </div>
        )
    } else {
        return (<div></div>)
    }
}