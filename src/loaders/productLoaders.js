import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () =>{
    const loadedProducts = await fetch('products.json')
    const products = await loadedProducts.json()

    const newCart = [];
        const storedCart = getShoppingCart()
        for (const id in storedCart) {
            const storedProduct = products.find(pd => pd.id === id);
            if(storedProduct){
                storedProduct.quantity = storedCart[id];
                newCart.push(storedProduct)
            }
            
        }

    return newCart;
}

export default cartProductsLoader;