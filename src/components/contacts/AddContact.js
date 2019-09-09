import React, { Component } from "react";
import { Consumer } from "../../providers/Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class AddContact extends Component {
  state = {
    addContact: false,
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // ошибки
    if (name === "") {
      this.setState({ errors: { name: "Введите имя" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Введите телефон" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Введите email" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );

    dispatch({ type: "ADD_CONTACT", payload: res.data });

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
                Добавить контакт
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Имя"
                    name="name"
                    placeholder="Введите имя"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Телефон"
                    name="phone"
                    placeholder="Введите телефон"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <input
                    type="submit"
                    value="Добавить"
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

export default AddContact;
