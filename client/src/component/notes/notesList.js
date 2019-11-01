import React from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";

export default class NotesList extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }
  componentDidMount() {
    axios
      .get("/notes", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        //console.log(response.data, "data");
        this.setState({ notes: response.data }, () => {
          //console.log(this.state.notes);
        });
      })
      .catch(err => {
        window.alert(err);
      });
  }

  handleRemove = id => {
    axios
      .delete(`/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState(prev => {
          return {
            notes: prev.notes.filter(notes => notes._id !== id)
          };
        });
      });
  };

  render() {
    //console.log(this.state);
    return (
      <div className="row h-100 justify-content-center align-items-center mt-5">
        <h3>Notes - {this.state.notes.length}</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.notes.map(note => (
              <tr key={note._id}>
                <td>{note.title}</td>
                <td>{note.categoryId.name}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-1"
                    to={`/notes/${note._id}`}
                  >
                    Show
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleRemove(note._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/notes/add">Add New Note</Link>
      </div>
    );
  }
}
