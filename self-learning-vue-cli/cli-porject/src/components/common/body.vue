<template>
  <div class="body">
    <div v-if="warning.state" class="toast-from-top animated toastInDown">
      <div>{{warning.text}}</div>
    </div>

    <div v-if="loading.show" class="toast-as-loading animated ">
      <div class="loading-wrap">
        <div class="loading-icon">
          <svg class="animated rotate360 infinite" width="38px" height="38px">
            <use xlink:href="#avatar-default" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
          </svg>
        </div>
        <div class="loading-tips">{{loading.info}}</div>
      </div>
    </div>
    <!-- <div class="toast-from-bottom animated toastInUp">
      <div>toaster</div>
    </div> -->
    <slot class='body-slot' name='body-slot'></slot>
  </div>
</template>

<script>
// import { getquestion } from '@/service';
import { mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Home',
    };
  },
  computed: {
    ...mapState([
      'warning',
      'loading',
    ]),
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped>
.body{
  width: 100%;
  position: fixed;
  z-index: 999;
  bottom: 0px;
  top: 44px;
  left: 0;
  right: 0;
  overflow-y: scroll;
  background: lightgreen;
}
.toast-from-top{
  position: absolute;
  width: 100%;
  height: 2rem;
  right: 0;
  left: 0;
  top: 20px;
  z-index: 99;
}
.toast-from-top > div{
  width: 16rem;
  height: 2rem;
  margin: 0 auto;
  background: red;
}

.toast-from-bottom{
  position: absolute;
  width: 100%;
  height: 2rem;
  right: 0;
  left: 0;
  bottom: 20px;
  z-index: 99;
}
.toast-from-bottom > div{
  width: 16rem;
  height: 2rem;
  margin: 0 auto;
  background: red;
}


.toast-as-loading{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #0009;
}
.loading-wrap{
  position: absolute;
  width: 8rem;
  height: 8rem;
  border-radius: 10px;
  transform: translate(50%, 50%);
  right: 50%;
  bottom: 50%;
  background: #dddddd;
}
.loading-icon{
  margin-top:1.5rem;
}
.loading-tips{
  margin-top:1rem;
}

</style>
