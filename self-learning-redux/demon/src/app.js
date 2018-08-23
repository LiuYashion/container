

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as types from '@/actions';

class App extends React.Component {
  render() {
    console.log(33333, this.props);
    return (
      <div>
        <h1>{ this.props.counter }</h1>
        <button onClick={ this.props.increment }>Increase</button>
        <button onClick={ this.props.decrement }>Decrease</button>
      </div>
    );
  }
}

// 与App关联起来，将state，dispatch映射到props中 这里就是state的状态
const mapStateToProps = (state) => {
  console.log(1111, state);
  return {
    counter: state.counter,
    version: 'liuyaxiong',
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(types, dispatch);
const Root = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default Root;
