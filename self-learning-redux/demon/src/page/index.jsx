import React from 'react';

export default class Root extends React.Component {
  render() {

    return (
      <div>
        <h1>Hello World</h1>
        <button onClick={ this.props.onIncrease('????') }>Increase</button>
        <button onClick={ this.props.onDecrease }>Decrease</button>
      </div>);
  }
}