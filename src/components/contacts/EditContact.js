import React, { Component } from "react";
import { Consumer } from "../../providers/Context";
// import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    addContact: false,
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // Check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name é obrigatório" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Telefone é obrigatório" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email é obrigatório" } });
      return;
    }

    const updContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div
                className="card-header"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  this.setState({
                    addContact: !this.state.addContact
                  })
                }
              >
                <i
                  className="fas fa-address-card"
                  style={{
                    cursor: "pointer",
                    float: "left",
                    color: "#076BFF"
                  }}
                />{" "}
                Изменить контакт
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Имя"
                    name="name"
                    placeholder="Имя"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Телефон"
                    name="phone"
                    placeholder="Телефон"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email "
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <input
                    type="submit"
                    value="Изменить"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
