




class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{ this.props.counter }</h1>
        <button onClick={ this.props.onIncrease }>Increase</button>
        <button onClick={ this.props.onDecrease }>Decrease</button>
      </div>
    );
  }
}

/** 与App关联起来，将state，dispatch映射到props中 */
const mapStateToProps = (state) => {
  return {
    counter: state
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(types, dispatch);
};
const Root =  connect(mapStateToProps, mapDispatchToProps)(App);






export default Root