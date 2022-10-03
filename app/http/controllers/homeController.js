const Menu = require('../../models/menu')
function homeController() {

    return {
        //to use the await functionality we made Index function async 
       async index(req,res) {
            //find collects all the data from the database
            /*
            Menu.find().then(function(pizzas){
                console.log(pizzas)
                res.render('home',{pizzas:pizzas})
        
            }) 
            */
            const pizzas=await Menu.find()
          //  console.log(pizzas)
            res.render('home',{pizzas:pizzas})
        }
    }

}

module.exports = homeController