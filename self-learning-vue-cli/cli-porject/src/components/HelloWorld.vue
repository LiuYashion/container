<template>
  <div>
    <my-header/>

    <my-bodyer hasFooter='true'>
      <div slot='body-slot'>
        <h1>{{ msg }}</h1>
        <h1>{{ msg }}</h1>
        <h3>{{ loading.show }}</h3>
        <h3>????????????????</h3>
        <h3 @click="showTest">show toastInDown</h3>
        <router-view/>
      </div>
    </my-bodyer>

  </div>
</template>

<script>
// import { getquestion } from '@/service';
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

import myHeader from '@/components/common/header';
import myBodyer from '@/components/common/body';
import myFooter from '@/components/common/footer';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Home',
    };
  },
  components: {
    myHeader, myBodyer, myFooter,
  },
  computed: {
    ...mapState([
      'loading',
    ]),
  },
  methods: {
    ...mapActions([
      'anqLoading',
      'anqWarning',
    ]),
    ...mapMutations([
      'SHOW_LOADING',
      'HIDE_LOADING',
      'SHOW_WARNING',
      'HIDE_WARNING',
    ]),
    ...mapGetters([
      'FILTER_ODD_ITEM',
      'FILTER_EVEN_ITEM',
    ]),
    showTest() {
      this.anqWarning('!!!!!!!!');
    },

    task1() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('1', '我是第一个任务，必须第一个执行');
          resolve('done');
        }, 3000);
      });
    },
    task2() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('2', '第二个任务');
          resolve('done');
        }, 1000);
      });
    },
    task3() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('3', '第三个任务');
          reject('error');
        }, 1000);
      });
    },
    task4() {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('4', '第四个任务');
          resolve('done');
        }, 2000);
      });
    },
    async allTasks() {
      await this.task1();
      await this.task2();
      await this.task3();
      await this.task4();
    },
  },
  mounted() {
    this.anqLoading();
    console.log(this.FILTER_ODD_ITEM());
    // this.allTasks();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  border-radius: 4px;
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
