import React from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";

export default class NoteShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data._id) {
          this.setState({ note: response.data });
        } else {
          window.alert("something went wrong");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center mt-5">
        {this.state.note._id && (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">{this.state.note.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {this.state.note.categoryId.name}
              </h6>
              <p className="card-text">{this.state.note.description}</p>
              <Link className="btn btn-primary card-link" to="/notes">
                Back
              </Link>
              <Link
                className="btn btn-primary card-link"
                to={`/notes/edit/${this.props.match.params.id}`}
              >
                Edit
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
