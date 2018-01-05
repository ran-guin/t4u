<template lang='pug'>
  div.page
    div.header
      PublicHeader
    div.subheader.overlay
      CustomMenu(:links='links' type='url')
    div.body.container
      img.bg
      div.navbar-right
        div.cart
          h3 Cart
            br
            b ({{items}} items)
          ul
            li(v-for="item in cart")
              b {{item.name}} [ {{item.amount}} x {{item.qty}} ] = {{item.amount*item.qty}}
          form(action="/process-payment" method="POST") 
            button.btn.btn-primary(:disabled="!items") Checkout
              <!-- stripe-checkout(stripe-key="my-stripe-key" product="product(tea.name, tea.description, tea.price100g)") -->
      div.overlay
        h2 T4U
        h3 Black Teas
        ul
          li(v-for="tea in teas")
            div(v-if="tea.name === ''")
              b {{tea.variety}} Teas:
            div(v-else)
              div(v-if="tea.name === tea.variety")
               b {{tea.variety}}
              h4
                button.btn.btn-primary.btn-xs(@click.prevent="add2cart(tea.id, tea.name, tea.description, tea.price100g, 1)") +
                b &nbsp; &nbsp; 
                span(data-toggle='tooltip' :title="tea.description") {{tea.name}} [ ${{tea.price100g}} ] 
    div.footer
      PublicFooter

</template>

<script>
// import config from '@/config.js'
import PublicHeader from './../PublicHeader'
import PublicFooter from './../PublicFooter'
import CustomMenu from './../Standard/Menu'

// import { StripeCheckout } from 'vue-stripe'

var links = ['Main']

export default {
  name: 'hello',
  components: {
    PublicHeader,
    CustomMenu,
    PublicFooter
  },
  data () {
    return {
      msg: 'Welcome to My Vue.js App',
      // ################## Add Link List Below for Testing ######################
      links: links,

      // Test Data ###
      cart: {},
      varieties: ['Earl Grey', 'Pu Ehr'],
      teas: [
        {id: 1, name: '', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00'},
        {id: 2, name: 'Earl Grey Cream', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00'},
        {id: 3, name: 'Lady Earl Grey', variety: 'Earl Grey', description: 'Classic Earl Grey with Vanilla', price100g: '12.00', price200g: '22.00'},
        {id: 4, name: 'Pu Ehr', variety: 'Pu Ehr', description: 'Classic Pu Ehr', price100g: '45.00', price200g: '82.00'}
      ]
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
    add2cart (id, name, desc, amount, qty) {
      if (this.cart[id]) {
        console.log('add another ' + id)
        var count = this.cart[id].qty + 1
        // var item = {id: id, name: name, description: desc, amount: amount, qty: qty}
        this.$set(this.cart[id], 'qty', count)
      } else {
        var item = {id: id, name: name, description: desc, amount: amount, qty: qty}
        console.log('added ' + JSON.stringify(item))
        this.$set(this.cart, id, item)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass?outputStyle=expanded">

/*** Customize Header / Footer Settings: ***/
$header-height: 80px;
$header-background-colour: #cfc;
$header-padding: 10px 30px;

$subheader-height: 50px;
$subheader-background-colour: transparent;

$footer-height: 90px;
$footer-background-colour: #ffc;

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
  min-height: calc(100vh - #{$header-height} - #{$footer-height} - #{$subheader-height});
  color: white;
  z-index: 10000;
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
  position: absolute;
/*  top: 50%;
  left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  color: white;
  /*text-align: center;*/
}

.cart {
  position: fixed;
  right: 20px;
  background-color: #cfc;
  padding: 10px;
  border: 1px solid black;
  /*margin: 10px;*/
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
    