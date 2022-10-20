import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "foo",
      text: "",
      result: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputText = event.target.inputFieldMessage.value
    fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText })
    }).then(
      response => response.json()
    ).then(
      data => { this.setState({ result: data.output }); }
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Sentiment analysis</h1>
        <h3>Submit a message and check it's sentiment</h3>
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
        <div className="Output">
          <p>Your message sentiment: {this.state.result}</p>
        </div>
      </div>
    );
  }
}

export default App;
