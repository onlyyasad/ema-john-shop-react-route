import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {

    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    const loadedProducts = await fetch('http://localhost:5000/productsById', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    })
    const products = await loadedProducts.json();
    

    const newCart = [];

    for (const _id in storedCart) {
        const storedProduct = products.find(pd => pd._id === _id);
        if (storedProduct) {
            storedProduct.quantity = storedCart[_id];
            newCart.push(storedProduct)
        }

    }

    return newCart;
}

export default cartProductsLoader;