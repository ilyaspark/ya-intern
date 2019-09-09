import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Consumer } from "../../providers/Context";
import axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="container">
              <div className="card card-body mb-3">
                <h4>
                  {name}{" "}
                  <i
                    className="fas fa-sort-down"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.setState({
                        showContactInfo: !this.state.showContactInfo
                      })
                    }
                  />
                  <i
                    className="fas fa-times"
                    style={{ cursor: "pointer", float: "right", color: "red" }}
                    onClick={this.onDeleteClick.bind(this, id, dispatch)}
                  />
                  <Link to={`/contact/edit/${id}`}>
                    <i
                      className="fas fa-user-edit"
                      style={{
                        cursor: "pointer",
                        float: "right",
                        color: "blue",
                        marginRight: "1rem"
                      }}
                    />
                  </Link>
                </h4>
                {showContactInfo ? (
                  <ul className="list-group">
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Phone: {phone}</li>
                  </ul>
                ) : null}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
