const Order = require('../../../models/order')
const moment = require('moment')
const user = require('../../../models/user')
function orderController (){

    return {
        //storing data in database 
        /*
        1. To do that we need collection folder
        2. for that we need a model
        */
        store(req,res){
           // Validate Req
            const { phone,address } = req.body //get request
            if(!phone || !address){
                req.flash('error','All fields are required')
                return res.redirect('/cart')
            }

            const order= new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address 
            })


            order.save().then(result =>{
                req.flash('success','Order placed successfully')
                //Deleting the cart by the below method
                delete req.session.cart

                //Emit event
                const eventEmitter= req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced',result)
                return res.redirect('/customer/orders')
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/cart')
            })
        },
        async index(req,res){
            const orders = await Order.find({
                customerId: req.user._id
            }, null,{sort: { 'createdAt': -1}})
            //moment is the js library we imported to fromat date and time
            res.render('customers/orders',{orders: orders, moment: moment})
            console.log(orders)
        },

        async show(req,res){
            const order = await Order.findById(req.params.id)
            //Authorize
            if(req.user._id.toString()===order.customerId.toString()){
                res.render('customers/singleOrder',{order})
            }
            else{
                req.flash('error','Invalid User');
                res.redirect('/')
                
            }
        }
    }
}

module.exports=orderController