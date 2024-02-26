export const getShoppingCartProducts = () => {
    let products = localStorage.getItem('products')
    if(products == null) {
        return []
    } else {
        return JSON.parse(products)
    }
}

export const getSelectedShoppingCartProductIds = () => {
    let ids = localStorage.getItem('selectedIds')
    if(ids == null) {
        return []
    } else {
        return JSON.parse(ids)
    }
}

export const addSelectedProductId = (id) => {
    let ids = getSelectedShoppingCartProductIds()
    ids.push(id)
    localStorage.setItem("selectedIds", JSON.stringify(ids))
}

export const removeSelectedProductId = (id) => {
    let ids = getSelectedShoppingCartProductIds()
    ids = ids.filter(sId => sId !== id)
    localStorage.setItem("selectedIds", JSON.stringify(ids))
}

export const addProductToShoppingCart = (product) => {
    let products = getShoppingCartProducts()
    let id = 1;
    if(products.length > 0) {
        id = products[products.length - 1].id + 1
    }
    product.id = id
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products))
}

export const removeProductFromShoppingCart = (id) => {
    let products = getShoppingCartProducts()
    const product = products.find(p => p.id === id)
    var index = products.indexOf(product);
    if (index !== -1) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products))
    }
}

export const getShoppingCartCount = () => {
    return getShoppingCartProducts().length
}