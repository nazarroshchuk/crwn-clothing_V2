import { useContext } from 'react';
import { ProductContext } from '../../../contexts/products.context';

const Shop = () => {

    const context = useContext(ProductContext);

    const products = context.products
    return (
        <div>
            {products.map(({id, name }) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))}
        </div>
    )
}

export default Shop;