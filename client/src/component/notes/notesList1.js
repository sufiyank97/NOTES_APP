import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";

const NotesList = () => {
    const [notes, setNotes] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios
                .get("/notes", {
                    headers: {
                        "x-auth": localStorage.getItem("token")
                    }
                })
            try {
                setNotes(res.data)
            } catch (err) {
                window.alert(err)
            }
        }
        fetchData()
    }, [])

    const handleRemove = async (id) => {
        const res = await axios
            .delete(`/notes/${id}`, {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
        try {
            setNotes(notes.filter(note => note._id != id))
        } catch (err) {
            window.alert(err)
        }
    }

    return (
        <div className="row h-100 justify-content-center align-items-center mt-5">
            {console.log(notes, 'kkk')}
            <h3>Notes - {notes.length}</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => (
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
                                    onClick={() => handleRemove(note._id)}
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
    )
}
export default NotesList