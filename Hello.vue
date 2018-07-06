<template lang='pug'>
  div.page
    div.body
      div
        div.container
          span.navbar-left
            CustomMenu(direction='horizontal' :links='links' type='function' :onClick="chooseType" :options='options')
          span.navbar-right
            table.table(style='margin: 0px')
              tr
                td
                  LoginButton() &nbsp; &nbsp; 
                  b U: {{count}}
                  <!-- Modal(id='search-modal' type='search' :options="search_options" :picked="selected" :onDelete='deleteItem') -->
                td
                  SearchButton()
          table.table
            tr
              td(colspan=2)
                hr
            tr
              td.teas
                Teas(:teas="teas" :page="page" :add="add2cart" :type="active_type")
              td
                Cart(:cart="cart" :add="add2cart")
    div.footer
      PublicFooter

</template>

<script>
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'
import LoginButton from './../Standard/LoginButton'
import SearchButton from './../Standard/SearchButton'
import Teas from './Teas'
import CustomMenu from './../Standard/Menu'
import Cart from './../Standard/Cart'
import Modal from './../Standard/Modal'

import axios from 'axios'

import 'vue-awesome/icons/shopping-cart'
import 'vue-awesome/icons/close'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/search'

// import { StripeCheckout } from 'vue-stripe'

export default {
  name: 'hello',
  components: {
    PublicHeader,
    CustomMenu,
    PublicFooter,
    SearchButton,
    LoginButton,
    Teas,
    Cart,
    Modal
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
        {id: 1, name: '', type: 'Black', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00', qty: 1, amount: '12.00'},
        {id: 2, name: 'Earl Grey Cream', type: 'Black', variety: 'Earl Grey', description: 'Classic Black Tea with Bergamont & Corn Flowers', price100g: '12.00', price200g: '22.00', qty: 1, amount: '12.00'},
        {id: 3, name: 'Lady Earl Grey', type: 'Black', variety: 'Earl Grey', description: 'Classic Earl Grey with Vanilla', price100g: '12.00', price200g: '22.00', qty: 1, amount: '12.00'},
        {id: 4, name: 'Pu Ehr', type: 'Black', variety: 'Pu Ehr', description: 'Classic Pu Ehr', price100g: '45.00', price200g: '82.00', qty: 1, amount: '12.00'},
        {id: 5, name: 'Oolong', type: 'Green', variety: 'Oolong', description: 'Classic Oolong', price100g: '55.00', price200g: '93.00', qty: 1, amount: '12.00'},
        {id: 6, name: 'Rooibos - Honeybush', type: 'Rooibos', variety: 'Rooibos', description: 'Classic Rooibos - Honeybush', price100g: '55.00', price200g: '93.00', qty: 1, amount: '12.00'}
      ],
      links: [{Black: 'Black', Green: 'Green', White: 'White', Red: 'Rooibos', '|': '', Accessories: 'Accessories'}],
      options: {default: 'Black', colour: 'blue', hoverColour: 'red'},
      active_type: 'Black',

      // Modal Options
      info_options: {
        access_type: 'append',
        table: 'tea',
        close: 'Cancel',
        toggle: false
        // onSave: this.saveImmunization
      },
      search_options: {
        type: 'search',
        title: 'Tea Varieties',
        openIcon: 'search',
        closeButton: 'Close Scheduler',
        search: {
          scope: 'selectTeas',
          model: 'selectTeas',
          method: 'get',
          url: '/search',
          prompt: 'Search Teas',
          field: 'name',
          search_fields: ['name', 'variety', 'type'],
          show_fields: ['name', 'description', 'variety', 'type'],
          // onPick: this.addCoverage,
          multiSelect: true,
          target: 'selectTeas',
          picked: this.selectedTeas,
          stored: 'selectTeas'
        },
        data: {
          onDelete: this.deleteItem,
          stored: 'coverage'
        }
      },
      selected: []
    }
  },
  computed: {
    count: function () {
      return this.$store.getters.modalUpdates
    },
    selectedTeas: function () {
      return [{name: 'Selected', description: 'fill desc', variety: 'tea v'}]
    },
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
    uploadTeas: function () {
      var url = 'http://127.0.0.1:3333/upload'
      var data = { name: 'Earl Gray', type: 'Black', price: '15.99' }
      console.log(url + ' sent: ' + JSON.stringify(data))

      axios.post(url, data)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log('axios response: ' + JSON.stringify(response.data))
      })
      .catch(e => {
        console.log('error uploading Teas...')
        console.log(e)
      })
    },
    teaInfo: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      var data = [
        {'tea': 'Earl Grey', details: 'fill in details..'}
      ]

      this.$store.dispatch('setModalData', data)
      console.log('Data:' + JSON.stringify(data))
      this.$store.dispatch('toggleModal', 'info-modal')
    },

    toggleSearch: function (record) {
      this.$store.dispatch('toggleModal', 'info-modal')
    },

    deleteItem: function (index, key) {
      if (!key) { key = 'coverage' }
      console.log('DYNO: delete ' + key + ' item: ' + index)
      // this.$store.dispatch('deleteHashItem', {key: key, index: index})

      this.$store.commit('removeHashItem', {key: key, index: index})
    },
    add2cart (list) {
      console.log('add item to cart: ' + JSON.stringify(list))

      var items = []
      if (list.constructor === Object) {
        items.push(list)
      } else if (list.constructor === Array) {
        items = list
      } else {
        console.log('can only add hash or array to cart....')
      }

      for (var i = 0; i < items.length; i++) {
        var item = items[0]
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
  color: white;
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
  padding: 20px;
}

.teas {
  vertical-align: top;
  width: 100%;
}

.cart {
  /*position: relative;*/
}
/*.table {
  position: relative;
  margin-left: -1%;
}*/

/*.overlay {
  position: relative;
  margin-left: -10%;
}
*/

.relative {
  position: relative;
}

@media screen and (max-width: 512px) { /* Specific to this particular image */
  img.bg {
    display: none;
  }
}

.page {
  z-index: -1;
  /* Set rules to fill background */
  min-height: 100%;
  /*min-width: 1024px;*/

  background-image: url("/static/images/tealeaves.jpeg");
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
  /*width: 100%;*/
/*  top: 50%;
  left: 50%;*/
  /*transform: translate(-50%, -50%);*/
  color: #333;
  /*text-align: center;*/
  z-index:1000;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*color: black;*/
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
    
