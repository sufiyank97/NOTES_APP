import React, { useState, useEffect } from "react";
import axios from "../../config/axios";

const AddNote = (props) => {
    const [categories, setCategory] = useState([])
    const [formValues, setForm] = useState({ title: '', description: '', select: '' })
    useEffect(() => {
        async function fetchData() {
            const res = await axios
                .get("/categories", {
                    headers: {
                        "x-auth": localStorage.getItem("token")
                    }
                })
            try {
                setCategory(res.data)
                if (props.match.params.id) {
                    const id = props.match.params.id;
                    axios
                        .get(`/notes/${id}`, {
                            headers: {
                                "x-auth": localStorage.getItem("token")
                            }
                        })
                        .then(response => {
                            setForm({

                                title: response.data.title,
                                description: response.data.description,
                                select: response.data.categoryId
                            })
                        })
                        .catch(err => {
                            window.alert(err)
                        })
                }
            } catch (err) {
                window.alert(err)
            }
        }
        fetchData()
    }, [props.match.params.id])

    const handleChange = (e) => {
        setForm({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            title: formValues.title,
            description: formValues.description,
            categoryId: formValues.select
        }

        if (props.match.params.id) {
            console.log(body, "params")
            const id = props.match.params.id;
            axios
                .put(`/notes/${id}`, body, {
                    headers: {
                        "x-auth": localStorage.getItem("token")
                    }
                })
                .then(response => {
                    if (response.data.message) {

                        window.alert("validation failed params");
                    } else {
                        setForm({
                            ...formValues,
                            title: '',
                            description: '',
                            select: ''
                        })
                        props.history.push('/notes')
                    }
                })
                .catch(err => {
                    window.alert(err)
                })
        } else {
            console.log(body)
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
                        setForm({
                            ...formValues,
                            title: '',
                            description: '',
                            select: ''
                        })
                        props.history.push('/notes')
                    }
                })
                .catch(err => {
                    window.alert("something went wrong");
                });
        }
    }
    return (
        <div className="row h-100 justify-content-center align-items-center">
            <form onSubmit={handleSubmit}>
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
                            value={formValues.title}
                            onChange={handleChange}
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
                            value={formValues.description}
                            onChange={handleChange}
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
                        value={formValues.select}
                        onChange={handleChange}
                        name="select"
                    >
                        <option value="">Choose...</option>
                        {categories.map(category => {
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
    )
}
export default AddNote