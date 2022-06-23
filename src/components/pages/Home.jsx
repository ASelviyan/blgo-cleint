import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { useState, useEffect } from "react"
export default function Home() {
    const { id } = useParams
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/blog`)
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getBlog()
    }, [])

    const allBlogs = blogs.map((blog) => {
        return (
            <div key={blog._id}>
                <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </div >
        )
    })
    return (
        <>
            <h2>home page</h2>
            {allBlogs}
        </>
    )
}