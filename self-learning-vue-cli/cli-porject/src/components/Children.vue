<template>
  <div class="hello">
    33333333333333333333333
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
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'anqLoading',
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
    this.anqLoading();
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
