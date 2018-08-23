import Vue from 'vue';
import Router from 'vue-router';

/* eslint-disable global-require */
const HelloWorld = r => require.ensure([], () => r(require('@/components/HelloWorld')), 'HelloWorld');
const Children = r => require.ensure([], () => r(require('@/components/Children')), 'Children');


Vue.use(Router);

export default new Router({
  routes: [{
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld,
    children: [{
      path: 'child',
      component: Children,
    }],
  }],
});

