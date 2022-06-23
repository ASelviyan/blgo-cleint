import CommentForm from "./CommentForm";

export default function BlogDetails({ blog, makeComment }) {

    return (
        <>
            <h2>{blog.title}</h2>
            <h6>{blog.name}</h6>
            <p>{blog.content}</p>

            <CommentForm makeComment={makeComment} />
        </>
    )
}