'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 
 * router主要用来描述 URL 与 具体承担动作的controller 的关系
 */
module.exports = app => {

  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/user/:id', controller.user.info);
  
};
