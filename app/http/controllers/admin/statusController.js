const order = require("../../../models/order")
const user = require("../../../models/user")
const Order = require("../../../models/order")
function statusController(){

    return {

        update(req,res){
            Order.updateOne({_id:req.body.orderId},{status: req.body.status},(err,data)=>
            {
                if(err){
                    req.flash('error','Something Went Wrong')
                }
                //Socket Emit event

                const eventEmitter= req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated',{id: req.body.orderId, status: req.body.status })

                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports=statusController