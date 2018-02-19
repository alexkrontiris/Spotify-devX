/* global Demo, React, ReactDOM, firebase */

var Loading = React.createClass({
  render() {
    return (
      <div className="spinner">
  <div className="dot1"></div>
  <div className="dot2"></div>
</div>
    );
  }
});

window.Loading = Loading;