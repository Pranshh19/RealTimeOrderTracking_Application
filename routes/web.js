const homeController=require('../app/http/controllers/homeController')
const menuController=require('../app/http/controllers/menuController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderController')

const AdminOrderController=require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController')



//Middlewares
const guest  = require('../app/http/middleware/guest')
const auth  = require('../app/http/middleware/auth')
const admin  = require('../app/http/middleware/admin')
const { Router } = require('express')




function initRoutes(app) {


    //homeController function mai index wale method ko bulane ke liye . operator use kra
  app.get("/", homeController().index)
  app.get("/menu", menuController().index)

//   (req, res) => {
//     res.render("home"); //here you can paste html file
//   });

  
//   (req, res) => {
//     res.render("customers/cart");
//   });

  app.get("/login", guest, authController().login )
  app.post("/login", authController().postLogin)

//   (req, res) => {
//     res.render("auth/login"); // "auth/login" means auth folder ke andr login.ejs hai usko server pr bulao
//   });

  app.get("/register", guest,authController().register)
  app.post('/register',authController().postRegister)

  app.post('/logout',authController().logout)

//   (req, res) => {
//     res.render("auth/register");
//   });

    //Customer to cart
   app.get("/cart", cartController().index)


  app.post('/update-cart',cartController().update)
  app.post('/delete-cart',cartController().deleteInCart)


  //Customer Routes
  //auth is the middlewear which makes sure that only the logges in user gets access to the resources
  app.post('/orders',auth , orderController().store)
  app.get('/customer/orders',auth, orderController().index)
  app.get('/customer/orders/:id',auth, orderController().show)

  //Admin Route
  app.get('/admin/orders',admin, AdminOrderController().index)
  app.post('/admin/order/status',admin, statusController().update)

}
module.exports = initRoutes;
