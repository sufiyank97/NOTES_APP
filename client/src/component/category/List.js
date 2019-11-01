import React from "react";
import axios from "../../config/axios";
import CatList from "./CatList";

class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      val: ""
    };
  }
  componentDidMount() {
    axios
      .get("/categories", {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({ categories: response.data }, () => {
          console.log(this.state.categories);
        });
      })
      .catch(err => {
        console.log(err, "sdfsdf");
        window.alert(err);
      });
  }

  handleRemove = id => {
    axios
      .delete(`/categories/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState(prev => {
          return {
            categories: prev.categories.filter(category => category._id !== id)
          };
        });
      });
  };
  handleAdd = e => {
    e.preventDefault();
    const body = {
      name: this.state.val
    };

    axios
      .post("/categories", body, {
        headers: {
          "x-auth": localStorage.getItem("token")
        }
      })
      .then(response => {
        if (response.data.name) {
          this.setState(prev => {
            return {
              categories: [...prev.categories, response.data],
              val: ""
            };
          });
        }
      })
      .catch(err => {
        console.log(err);
        window.alert("something went wrong");
      });
  };
  handleChange = e => {
    this.setState({ val: e.target.value });
  };

  render() {
    return (
      <div className="container mt-5 text-center">
        <h3>Categories -{this.state.categories.length}</h3>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-8">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map(category => (
                  <CatList
                    key={category._id}
                    id={category._id}
                    name={category.name}
                    handleRemove={this.handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h3>Add Categories</h3>
            <form onSubmit={this.handleAdd}>
              <div className="form-group">
                <label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={this.state.val}
                    placeholder="Category Name"
                    onChange={this.handleChange}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoriesList;
