import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

const ProductContext = createContext();

function ProductContextProvider(props) {
    const [product, setProduct] = useState(null);
    const [trigger, setTrigger] = useState(false);

    useEffect( () => {
        const run = async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/product/landing');
                //console.log(result.data.products);
                setProduct(result.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        run();
    }, [trigger]);

    return (
        <ProductContext.Provider value={ {product, setProduct, trigger, setTrigger} }>
            {props.children}
        </ProductContext.Provider>
    )
};

export { ProductContextProvider }
export default ProductContext;