import { useParams } from "react-router-dom"
import "./ProductDetail.css"
import * as React from 'react'
import NotFound from "../NotFound/NotFound"
import ProductView from "../ProductView/ProductView"
import axios from "axios";
import { API_BASE_URL } from "../../../constants";

export default function ProductDetail(props) {
    //states
    const [hasFetched, setHasFetched] = React.useState();
    const [isLoading, setIsLoading] = React.useState();
    const [product, setProduct] = React.useState({});
    const [error, setError] = React.useState();

    const { productId } = useParams();

    //search for product based on ID
    React.useEffect(() => {
        const getProductById = async () => {
            setHasFetched(false);
            setIsLoading(true);

            try {
                const response = await axios.get(API_BASE_URL + '/store/' + productId);
                console.log("ProductDetail.jsx product:", response);
                if (response?.data?.product) {
                    setProduct(response?.data?.product);
                }
            } catch (error) {
                console.log(error);
                setError(error);
            }
            setHasFetched(true);
            setIsLoading(false);
        }
        getProductById();
    }, [productId])
    // error handling
    if (error) {
        return <NotFound />
    }

    // prevent component from returning undefined data
    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        // if no problems were found, render component
        (!error && !isLoading && hasFetched) ?
            <div className="product-detail">
                <ProductView
                    handleAddItemToCart={props.handleAddItemToCart}
                    handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                    shoppingCart={props.shoppingCart}
                    setShoppingCart={props.setShoppingCart}
                    product={product} 
                    />
            </div>
            :
            <NotFound productId={productId} error={error} />
    )
}

