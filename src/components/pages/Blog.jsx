import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from 'axios'
import BlogDetails from "../BlogDetails"
import Comment from '../Comment'

export default function Blog() {
    const { id } = useParams()
    const [blog, setBlog] = useState({})
    const [comments, setComments] = useState([])

    useEffect(() => {
        const singleBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog/${id}`)
                setBlog(response.data)
                setComments(response.data.comments)


            } catch (error) {
                console.log(error)
            }
        }

        singleBlog()
    }, [id, comments])

    const makeComment = async comment => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/blog/${id}/comment`, comment)

            setComments([...comments, res.data])
        } catch (error) {
            console.warn(error);
        }
    }



    const allComments = comments.map(comment => {
        // console.log(comment._id)
        // console.log(blog)
        return <Comment key={comment._id} id={comment._id} content={comment.content} blogId={id} />
    })
    return (
        <>
            <h2>Blog page</h2>
            <BlogDetails blog={blog} makeComment={makeComment} />
            <Comment comments={blog.comments} />
            {allComments}
        </>
    )
}