<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{ loadingState.show }}</h3>
    <h3>{{ loadingState.info }}</h3>
  </div>
</template>

<script>
// import { getquestion } from '@/service';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Home',
    };
  },
  computed: {
    ...mapState([
      'loadingState',
    ]),
  },
  methods: {
    ...mapActions([
      'getTestUser',
    ]),
    ...mapMutations([
      'SHOW_LOADING',
      'HIDE_LOADING',
    ]),
    ...mapGetters([
      'FILTER_ODD_ITEM',
      'FILTER_EVEN_ITEM',
    ]),
  },
  mounted() {
    this.getTestUser();
    console.log(this.FILTER_ODD_ITEM());
  },
};
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
