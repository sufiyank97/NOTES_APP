import React from "react";
import axios from "../../config/axios";

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      select: "",
      categories: []
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const body = {
      title: this.state.title,
      description: this.state.description,
      categoryId: this.state.select
    };
    if (this.props.match.params.id) {
      console.log("wrong");
      const id = this.props.match.params.id;
      axios
        .put(`/notes/${id}`, body, {
          headers: {
            "x-auth": localStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.data.message) {
            window.alert("validation failed");
          } else {
            console.log(response.data);
            this.setState(
              {
                title: "",
                description: "",
                select: ""
              },
              () => {
                this.props.history.push("/notes");
              }
            );
          }
        })
        .catch(err => {
          window.alert("something went wrong");
        });
    } else {
      console.log("right");
      axios
        .post("/notes", body, {
          headers: {
            "x-auth": localStorage.getItem("token")
          }
        })
        .then(response => {
          if (response.data.errors) {
            window.alert("validation failed");
          } else {
            console.log(response.data);
            this.setState(
              {
                title: "",
                description: "",
                select: ""
              },
              () => {
                this.props.history.push("/notes");
              }
            );
          }
        })
        .catch(err => {
          window.alert("something went wrong");
        });
    }
  };
  componentDidMount() {
    axios
      .get("/categories", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({ categories: response.data }, () => {
          if (this.props.match.params.id) {
            console.log("1");
            const id = this.props.match.params.id;
            axios
              .get(`/notes/${id}`, {
                headers: {
                  "x-auth": localStorage.getItem("token")
                }
              })
              .then(response => {
                this.setState(
                  {
                    title: response.data.title,
                    description: response.data.description
                  },
                  () => {
                    this.setState({ select: response.data.categoryId });
                  }
                );
              })
              .catch(err => {
                window.alert(err);
              });
          } else {
            if (this.state.categories.length > 0) {
              this.setState(prev => {
                return {
                  select: prev.categories[0]._id
                };
              });
            }
          }
        });
      })
      .catch(err => {
        window.alert(err);
      });
  }

  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
        <form onSubmit={this.handleSubmit}>
          <h3>Add Note</h3>
          <hr />
          <div className="form-group">
            <label>
              title
              <input
                required
                type="text"
                name="title"
                className="form-control"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              description
              <input
                required
                type="textarea"
                name="description"
                className="form-control"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>Category</label>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Options
              </label>
            </div>
            <select
              className="custom-select"
              id="inputGroupSelect01"
              value={this.state.select}
              onChange={this.handleChange}
              name="select"
            >
              <option value="">Choose...</option>
              {this.state.categories.map(category => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddNote;
