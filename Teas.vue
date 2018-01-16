<template lang='pug'>
  div.teas
    Modal(id='info-modal' type='record' :options="info_options")
    ul.teaList
      li(v-for="tea in teas" v-if="tea.name && tea.type === type")
        b.tea {{tea.name}} &nbsp; &nbsp;
        button.btn.btn-primary.btn-xs(@click.prevent='teaInfo(tea)') ?
        span &nbsp; &nbsp;
        button.btn.btn-primary.btn-xs(@click.prevent='add2Cart(tea)') +

</template>

<script>

import Modal from './../Standard/Modal'
import axios from 'axios'

export default {
  name: 'Teas',
  components: {
    Modal
  },
  data () {
    return {
      types: ['Black', 'Green', 'White', 'Red', 'Herbal'],
      info_options: {
        access_type: 'view',
        table: 'tea',
        access: 'read',
        fields: [{name: 'name'}],
        close: 'Cancel',
        toggle: false,
        onPick: this.teaInfo,
        addLinks: [
            {type: 'button', name: 'Add to Cart', onPick: this.add2Cart}
        ]
      }
    }
  },
  props: {
    teas: { type: Array },
    type: { type: String, default: 'Black' },
    add: { type: Function }
  },
  methods: {
    onPick: function (record) {

    },

    teaInfo: function (record) {
      console.log('retrieve more schedule info from record: ' + JSON.stringify(record))

      this.$store.dispatch('setModalData', record)
      this.$store.getters.toggleModal('info-modal')
    },

    add2Cart (item) {
      console.log('add to cart..')
      console.log(JSON.stringify(item))
      if (!item) { item = {} }
      if (this.add) {
        this.add(item)
      } else {
        console.log('no add function supplied...')
      }
    }
  },
  computed: {
    record: function () {
      var url = 'http://127.0.0.1:3333/teas'
      console.log('get teas from record...')
      axios.get(url)
      .then(response => {
        // JSON responses are automatically parsed.
        console.log('axios response: ' + JSON.stringify(response.data))
        return response
      })
      .catch(e => {
        console.log('error retrieving Teas...')
        console.log(e)
        return []
      })
    }
  }
}
</script>

<style scoped lang="sass?outputStyle=expanded">

.teaList {
  color: white;
}
.tea {

}

</style>