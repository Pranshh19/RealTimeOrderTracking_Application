//client side code 
//yarn add axios ke baad ye line
import axios from 'axios';

import Noty from 'noty'

let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')
function updateCart(pizza){
    //server pr request bhejen fetch krne ko
     
    //url,pizza
    axios.post('/update-cart', pizza).then(res=>{
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            timeout:1000, //1sec mai gyb
            text: "Item added to cart"
          }).show();
    }).catch(err=>{
        new Noty({
            type:'error',
            timeout:1000, //1sec mai gyb
            text: "Something went wrong"
          }).show();
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        //btn attribute   ke dataset ko data mai bdlo joh pizza ke andr stored hai. 
        //btn.dataset.pizza aur phir usko JSON.parse laga kr object mai badal lenge

        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
        

    })
})