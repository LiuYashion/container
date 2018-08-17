# Vuex
状态管理

## State
```js
...mapState([
  'doneTodosCount',
  'anotherGetter',
])
```

## Getter
当我们需要从state中的state派出一些状态
```js
...mapGetters([
  'doneTodosCount',
  'anotherGetter',
])
```

## Mutation
> mutation必须是同步函数
更改state的唯一方法就是提交mutation
```js
...mapMutations([
  'SHOW_LOADING',
  'HIDE_LOADING',
])
```

## Action
> action commit的是mutation, 而不是直接变更状态
> action可以包含异步操作
```js
...mapActions([
  'increment', 
  'incrementBy'
])
```