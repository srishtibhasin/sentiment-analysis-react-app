import React, { useState, useEffect } from 'react';
import './App.css';

class Output extends React.Component {
  render() {
    return <body>Your message: {this.props.text}</body>;
  }
}

function GetTime() {
  const [currentTime, setCurrentTime] = useState([]);

  useEffect(() => {
    fetch("/api/time").then(
      res => res.json()
    ).then(
      data => { setCurrentTime(data.time); }
    );
  }, []);

  return (
    <div className="Time">
      <p>The current time is {currentTime}</p>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "foo",
      text: "",
      reversed_text: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    // .split('').reverse().join('')
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputText = event.target.inputFieldMessage.value
    fetch("/api/reverse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText })
    }).then(
      response => response.json()
    ).then(
      data => { this.setState({ reversed_text: data.output }); }
    );
  }

  render() {
    return (
      <div className="App">
        <GetTime />
        <form
          onSubmit={this.handleSubmit}
        >
          <label>
            Your message:
            <input
              type="text"
              name="inputFieldMessage"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </label>
          <input type="submit" value="Submit!" />
        </form>
        {/* <div className="Output">
          <Output text={this.state.text} />
        </div> */}
        <body>Your message reversed: {this.state.reversed_text}</body>
      </div>
    );
  }
}

export default App;
