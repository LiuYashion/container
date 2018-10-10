
/** 使用 */
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});



/** Vuex */
var index = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};
return index;



/** 调用构造函数 */
var Store = function Store (options) {
  var this$1 = this;
  var plugins = options.plugins
  var strict = options.strict
  var state = options.state

  // 初始化store内部状态，Object.create(null)可以创建一个干净的空对象
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);

  // vuex支持模块，即将state通过key-value的形式拆分为多个模块
  // 模块的具体内容可以查看这里 ：https://vuex.vuejs.org/en/mutations.html
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  
  // 监听队列，当执行commit时会执行队列中的函数
  this._subscribers = [];

  // 创建一个vue实例，利用vue的watch的能力，可以监控state的改变，具体后续watch方法会介绍
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // 这个作者的注释已经写得挺明白，就是初始化根模块，递归注册子模块，收集getter
  installModule(this, state, [], this._modules.root);

  // 初始化store中的state,使得state变成响应式的，
  // 原理就是将state作为一个vue实例的data属性传入,具体在分析这个函数的时候会介绍
  resetStoreVM(this, state);

  // 执行插件，这个是一个数组，所以遍历他，然后执行每个插件的函数
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }

};


/**  */
var prototypeAccessors = { 
  state: { 
    configurable: true 
  } 
};
prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};
prototypeAccessors.state.set = function (v) {
  {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};




/** commit */

//  commit是vuex中一个比较重要的操作，因为它可以触发mutation修改对state的修改
//  并且是同步执行的
Store.prototype.commit = function commit (_type, _payload, _options) {
  var this$1 = this;

  // 首先统一传入参数的格式，主要是针对当type是个对象的情况，需要把这个对象解析出来
  var ref     = unifyObjectStyle(_type, _payload, _options);
  var type    = ref.type;
  var payload = ref.payload;
  var options = ref.options;

  var mutation = { type: type, payload: payload };
  // 这里entry存放得被包装过的mutation
  var entry = this._mutations[type];
  if (!entry) {
    {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  //  在_withCommit中触发上面获取的mutation函数，简单粗暴使用数组的forEach执行哈哈，
  //  之所以要在外面包一层_withCommit，是表明操作的同步性
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  // 这个就是之前说的监听队列，在每次执行commit函数时都会遍历执行一下这个队列
  this._subscribers.forEach(function (sub) { 
    return sub(mutation, this$1.state); 
  });

};

//  dispatch是跟commit有点相似的函数，但是commit必须是同步的，而dispatch是异步的
//  内部还是必须通过commit来操作state
Store.prototype.dispatch = function dispatch (_type, _payload) {
  var this$1 = this;

  // check object-style dispatch
  var ref     = unifyObjectStyle(_type, _payload);
  var type    = ref.type;
  var payload = ref.payload;

  var action  = { type: type, payload: payload };
  var entry   = this._actions[type];
  if (!entry) {
    {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { 
    return sub(action, this$1.state); 
  });

  //  因为dispatch支持异步，
  //  所以这里作者使用Promise.all来执行异步函数并且判断所有异步函数是否都已经执行完成，
  //  所以在文件最开始判断了当前环境必须支持promise就是这个原因
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)

};

// 这里还有很多方法...
Store.prototype.subscribe         = function(){}
Store.prototype.subscribeAction   = function(){}
Store.prototype.watch             = function(){}
Store.prototype.replaceState      = function(){}
Store.prototype.registerModule    = function(){}
Store.prototype.unregisterModule  = function(){}
Store.prototype.hotUpdate         = function(){}

// 保证方法同步
Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};




/** store类的代码结束 */
Object.defineProperties( Store.prototype, prototypeAccessors );


/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/
/*******************************************************************/




/**
 * 下面是一些辅助函数
 */


// resetStore 热更新 注销模块的时候使用到
function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { 
    return fn(obj[key], key); 
  });
}

// resetStoreVM 
function resetStoreVM (store, state, hot) {

  // 保存原有store的_vm
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};

  //  遍历这个对象，获取每个getter的key和对应的方法
  //  将getter以key-value的形式缓存在变量computed中，其实后面就是将getter作为vue实例中的计算属性
  forEachValue(wrappedGetters, function (fn, key) {
    computed[key] = function () { 
      return fn(store); 
    };
    Object.defineProperty(store.getters, key, {
      get: function () { 
        return store._vm[key]; 
      },
      enumerable: true 
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}