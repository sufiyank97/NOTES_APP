import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import CatList from "./CatList";
const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [val, setVal] = useState('');
    useEffect(() => {
        async function fetchData() {
            const res = await axios
                .get("/categories", {
                    headers: {
                        "x-auth": localStorage.getItem("token")
                    }
                })
                .then(res => {
                    setCategories(res.data)
                    console.log('1')
                })
                .catch(err => {
                    window.alert(err)
                })
        }
        fetchData()

    }, [])

    const handleAdd = (e) => {
        e.preventDefault()
        const body = { name: val }
        async function postCategory() {
            const res = await axios
                .post("/categories", body, {
                    headers: {
                        "x-auth": localStorage.getItem("token")
                    }
                })
                .then(res => {
                    if (res.data.name) {
                        setCategories([...categories, res.data])
                        setVal('')
                    }
                })
                .catch(err => {
                    window.alert(err)
                })
        }
        postCategory()
    }

    const handleRemove = (id) => {
        const deleteData = async () => {
            try {
                const res = await axios
                    .delete(`/categories/${id}`, {
                        headers: {
                            "x-auth": localStorage.getItem("token")
                        }
                    })
                setCategories(categories.filter(category => category._id !== id))
            }
            catch (err) {
                window.alert(err)
            }
        }
        deleteData()
    }

    return (
        <div className="container mt-5 text-center">
            <h3>Categories -{categories.length}</h3>
            <div className="row h-100 justify-content-center">
                <div className="col-md-8">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(category => (
                                <CatList
                                    key={category._id}
                                    id={category._id}
                                    name={category.name}
                                    handleRemove={handleRemove}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <h3>Add Categories</h3>
                    <form onSubmit={handleAdd}>
                        <div className="form-group">
                            <label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={val}
                                    placeholder="Category Name"
                                    onChange={e => { setVal(e.target.value) }}
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
    )
}

export default CategoriesList