<template>
  <div class="container">
    <button @click="showOverlay = true">Open Modal</button>
    <mtcOverlay
      :is-visible="showOverlay"
      @closeOverlay="showOverlay = false"
    >
      test
    </mtcOverlay>
  </div> <!-- .container -->
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      showOverlay: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
