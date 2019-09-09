import React, { Component } from "react";

export default class Test extends Component {
  state = {
    title: "",
    body: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

// componentDidMount() {
//   // used for HTTP Calls
//   console.log("Component Did Mount...");
// }

// componentWillMount() {
//   console.log("Component Will Mount...");
// }

// componentDidUpdate() {
//   // Change of States
//   console.log("Component Did Update...");
// }

// componentWillUpdate() {
//   // Change of States
//   console.log("Component Will Update...");
// }

// componentWillReceiveProps(nextProps, nextState) {
//   // Redux takes states and asssign as props
//   console.log("Component Will Receive Props...");
// }

// static getDerivedStateFromProps(nextProps, prevState) {
//   return { test: "something" };
// }

// getSnapshotBeforeUpdate(prevProps, prevState) {
//   console.log("get SnapshotBeforeUpdate...");
//   return;
// }
