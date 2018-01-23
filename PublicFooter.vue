<template lang='pug'>
  div.publicFooter
    span.navbar-left
      span(v-html="left")
    span.navbar-centre
      span(v-html="centre")
    span.navbar-right
      span(v-html='right')
      a(href='mailto:subir_guin@hotmail.ca?Subject=T4U%20website%20Contact') Contact Us
    a(href='/')
      span.acronym
        b &nbsp; C
        span ommunity
        b &nbsp; O
        span riented
        b &nbsp; S
        span oftware
        b &nbsp; I
        span nnovation
        b &nbsp; N
        span etwork
        span &nbsp; &nbsp;
        span &nbsp; &nbsp;

</template>


<script>
export default {
  // template: require('./main.pug'),

  data () {
    return {
    }
  },
  props: {
    left: {
      type: String
    },
    right: {
      type: String
    },
    centre: {
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .publicFooter {
    color: white;
  }
  .publicFooter span a {
    color: white;
  }
  .publicFooter span a:hover {
    color: red;
  }

  span a {
    color: white;
  }
  a {
    color: white;
  }
</style>
