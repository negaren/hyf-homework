import React from "react";
//import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: null
    };

    this.countUp = this.countUp.bind(this);
    this.startCounting = this.startCounting.bind(this);
  }

  startCounting() {
    setInterval(this.countUp, 1000);
  }

  countUp() {
    this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 0.5 }));
  }

  render() {
    return (
      <div>
        <div>{this.state.elapsedTime}</div>
        {!this.state.elapsedTime && (
            this.startCounting()
          //<button onClick={this.startCounting}>Start</button>
        )}
      </div>
    );
  }
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<Counter />, rootElement);
export default Counter