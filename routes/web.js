const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const guest  = require('../app/http/middleware/guest')
function initRoutes(app) {


    //homeController function mai index wale method ko bulane ke liye . operator use kra
  app.get("/", homeController().index)

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
}

module.exports = initRoutes;
