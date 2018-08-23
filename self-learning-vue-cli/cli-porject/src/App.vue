<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from '@/components/common/svg';

export default {
  components: {
    svgIcon,
  },
};
</script>

<style>
@import './style/animation.scss';
@import './style/reset.scss';
@import './style/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}

</style>
