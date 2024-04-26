
import React, { useState, useContext } from 'react';
import Product from "./Product.component";
import "./Product.component.css";
import productsData from '../../api/productsData';
import toast from "react-hot-toast";
import { addProductToShoppingCart, addSelectedProductId, getShoppingCartCount } from "../../shoppingCart/shoppingCart";
import { ShoppingCartContext, TokenContext } from "../../context/context";
import { useEffect } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../api/endpoints';

const Home = () => {
    const { shoppingCartCount, setShoppingCartCount } = useContext(ShoppingCartContext);
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const response = await axios.get(ENDPOINTS.Products)
        if(response.status === 200) {
            setProducts(response.data)
        } else {
            toast.error("Failed to fetch data")
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const onAddToShoppingCart = (product) => {
        addProductToShoppingCart(product);
        addSelectedProductId(product.id)
        toast.success("Added to cart");
        setShoppingCartCount(shoppingCartCount + 1);
    }

    return (
        <div>
            <div className="products-container">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        prices={Object.fromEntries(product.variants.map(v => [v.size, v.price]))}
                        description={product.description}
                        variants={product.variants}
                        onAddToCart={onAddToShoppingCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
