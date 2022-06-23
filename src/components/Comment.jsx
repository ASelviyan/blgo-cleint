import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Comment({ content, id, blogId }) {
    const [editedComment, setEditedComment] = useState({
        content: ''
    })
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    const deleteComment = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`)
            navigate(`/blog/${blogId}`)

        } catch (error) {
            console.log(error)
        }
    }

    const editComment = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`, editedComment)
            setEdit(!edit)

        } catch (error) {
            console.log(error)
        }
    }

    const changeToEdit = () => {
        setEdit(!edit)
        setEditedComment({ content })
    }

    return (
        <>
            {!edit ? (
                <div>
                    <p>{content}</p>
                    <button onClick={deleteComment}>Delete</button>
                    <button onClick={changeToEdit}>Edit</button>
                </div>
            ) : (
                <form onSubmit={editComment}>
                    <input
                        type='text'
                        value={editedComment.content}
                        onChange={(e) => setEditedComment({ content: e.target.value })}
                    />
                    <button type='submit'>Submit</button>
                </form>
            )
            }


        </>
    )
}