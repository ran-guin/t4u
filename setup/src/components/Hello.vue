<template lang='pug'>
  div.page
    div.header
      PublicHeader
    img.bg
    div.body.container
      div.overlay
        div.subheader
          CustomMenu(prefix="<b>T4U Teas: </b>" :links='links' type='function' :onClick="chooseType" :options='options')
        div.navbar-right
          Cart(:cart="cart" :add="add2cart")
        div.col-md-4
          b &nbsp;
        div.col-md-4
          Teas(:teas="teas" :page="page" :add="add2cart" :type="active_type")
        div.col-md-3
          b &nbsp;
    div.footer
      PublicFooter

</template>

<script>
// import config from '@/config.js'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'
import Teas from './Teas'
import CustomMenu from './Standard/Menu'
import Cart from './Standard/Cart'

import 'vue-awesome/icons/shopping-cart'
import 'vue-awesome/icons/close'
import 'vue-awesome/icons/home'

// import { StripeCheckout } from 'vue-stripe'

// var links = ['Main']

export default {
  name: 'hello',
  components: {
    PublicHeader,
    CustomMenu,
    PublicFooter,
    Teas,
    Cart
  },
  data () {
    return {
      msg: 'Welcome to My Vue.js App',
      // ################## Add Link List Below for Testing ######################
      // links: ['Teas', 'Ceramics', 'About Us'],

      showCart: false,
      // Test Data ###
      cart: {},
      pages: ['Black', 'Green', 'White', 'Red'],
      page: 'Black',
      varieties: ['Earl Grey', 'Pu Ehr'],
      teas: [
        {id: 1, name: '', type: 'Black', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00'},
        {id: 2, name: 'Earl Grey Cream', type: 'Black', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00'},
        {id: 3, name: 'Lady Earl Grey', type: 'Black', variety: 'Earl Grey', description: 'Classic Earl Grey with Vanilla', price100g: '12.00', price200g: '22.00'},
        {id: 4, name: 'Pu Ehr', type: 'Black', variety: 'Pu Ehr', description: 'Classic Pu Ehr', price100g: '45.00', price200g: '82.00'}
      ],
      links: [{Black: 'Black', Green: 'Green', Red: 'Rooibos'}],
      options: {default: 'Black', colour: 'blue', hoverColour: 'red'},
      active_type: 'Black'
    }
  },
  computed: {
    product: function (name, desc, price) {
      return { name: name, description: desc, amount: price }
    },
    items: function () {
      var ids = Object.keys(this.cart)
      var count = 0
      for (var i = 0; i < ids.length; i++) {
        count += this.cart[ids[i]].qty
      }

      return count
    }
  },
  methods: {
    add2cart (item) {
      if (!item) { item = {} }
      var id = item.id
      if (this.cart[id]) {
        var count = this.cart[id].qty || 0
        var add = item.qty || 1
        count += add
        this.$set(this.cart[id], 'qty', count)
      } else {
        var qty = item.qty || 1
        var newItem = {id: id, name: item.name, description: item.desc, amount: item.amount, qty: qty}
        this.$set(this.cart, id, newItem)
      }
    },
    chooseType (type) {
      console.log('activate ' + type)
      this.active_type = type
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass?outputStyle=expanded">

/*** Customize Header / Footer Settings: ***/
$header-height: 0px;
$header-background-colour: transparent;
$header-padding: 10px 30px;

$subheader-height: 40px;
$subheader-background-colour: transparent;

$footer-height: 90px;
$footer-background-colour: transparent;

/*.page { 
  background: url("/static/images/teapour.jpeg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
*/
.page {
  /*margin-top: -20px;*/
  height: 100%;
  width: 100%;
}

.header {
  height: $header-height;
  background-color: $header-background-colour;
  padding: $header-padding;

}
.footer {
  background-color: $footer-background-colour;
  height: $footer-height;

  position: fixed;
  width: 100%;

  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
}

.subheader {
  background-color: $subheader-background-colour;
  height: $subheader-height;
}

.body {
  min-height: calc(100vh - #{$header-height} - #{$footer-height});
  color: white;
  z-index: 10000;
}

.relative {
  position: relative;
}

@media screen and (max-width: 512px) { /* Specific to this particular image */
  img.bg {
    display: none;
  }
}

img.bg {
  z-index: -1;
  /* Set rules to fill background */
  min-height: 100%;
  /*min-width: 1024px;*/

  background-image: url("/static/images/teapour.jpeg");
/* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  /*background-color: rgba(255, 255, 0, 0.3);*/

  z-index: 0;
  opacity: 20%;

  /* Set up proportionate scaling */
  width: 100%;
  height: auto;
  
  /* Set up positioning */
  position: fixed;
  top: $header-height;
  left: 0;
}


@media screen and (max-width: 1024px) { /* Specific to this particular image */
  img.bg {
    left: 50%;
    /*margin-left: -512px;   /* 50% */
  }
}

.overlay {
  /*position: absolute;*/
  width: 100%;
/*  top: 50%;
  left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  color: #333;
  /*text-align: center;*/
  z-idex:1000;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: black;
  /*display: inline-block;*/
  /*margin: 0 10px;*/
}

a {
  color: #42b983;
}

.navbar-center
{
    position: absolute;
    width: 100%;
    left: 0;
    text-align: center;
    margin:0 auto;
}

</style>
    
