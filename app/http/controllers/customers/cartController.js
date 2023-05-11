function cartController() {

    return {
        index(req,res) {
            
            res.render('customers/cart')
        },
        update(req,res){
             
            if(!req.session.cart){
                req.session.cart={
                    items:{},
                    totalQty:0,
                    totalPrice:0
                }
               
            }
            let cart=req.session.cart
            
            //check if item doesn't exist in cart
             if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                    item: req.body,
                    qty:1
                }
                cart.totalQty = cart.totalQty+1;
                cart.totalPrice=cart.totalPrice+req.body.price
             }
             else{
                cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice= cart.totalPrice+req.body.price
             }
            return res.json({totalQty:req.session.cart.totalQty})
        },
        
        deleteInCart(req,res){
        let cart=req.session.cart
        let item=cart.items;
        let productid=req.body.id;
        //   console.log(req.body.prodId);
        //    console.log(item);
        //    console.log(cart);
        //    const products= req.body;
        
            res.redirect('/cart')
        }

    }

}


module.exports = cartController