<template>
  <div class="header">
    header
  </div>
</template>

<script>
// import { getquestion } from '@/service';
// import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Home',
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped>
.header{
  width: 100%;
  height: 44px;
  background: lightblue;
  z-index: 1000;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
