
import css1 from './style.scss';
import css2 from './style.less';

import React from 'react';
import ReactDOM from 'react-dom';
//  import Root from './page/index.jsx';


import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension'
import Iframe from 'react-iframe'

const increment = () => {
  return { type: 'INCREMENT' }
};
const decrement = () => {
  return { type: 'DECREMENT' }
};


class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <h1>{ this.props.counter }</h1>
        <button onClick={ this.props.onIncrease }>Increase</button>
        <button onClick={ this.props.onDecrease }>Decrease</button>
        <br/>
        <div className='container' onClick={this.goto}>
          
        </div>
      </div>
    );
  }
  goto(){
    window.open('./static/user.pdf')
  }
}


const mapStateToProps = (state) => {
  return {
    counter: state
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrease: (name) => { dispatch(increment(name)) },
    onDecrease: (name) => { dispatch(decrement(name)) }
  };
};

const Root =  connect(mapStateToProps, mapDispatchToProps)(App);






const reducer = function(state=0, action={}) {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default: return state;
  }
}

const store = createStore(
  reducer,
  composeWithDevTools()
);








const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Root/>
    </Provider>,
    document.getElementById('app')
  );
};


render()

store.subscribe(render);