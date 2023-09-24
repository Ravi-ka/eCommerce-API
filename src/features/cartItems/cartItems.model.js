// ProductId, userId, Quantity

export default class CartItemModel{
    constructor(productID, userID, quantity, id){
        this.productID=productID;
        this.userID=userID;
        this.quantity=quantity;
        this.id=id;
    }

    static add(productID, userID, quantity){
        const cartItem = new CartItemModel(productID, userID, quantity)
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem)
        return cartItems
    }

    static get(userID){
        return cartItems.filter((u)=> u.userID === userID)

    }

}

let cartItems = [
    new CartItemModel(1,2,1,1),
    new CartItemModel(1,2,2,2),

]