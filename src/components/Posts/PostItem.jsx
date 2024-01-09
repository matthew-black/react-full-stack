import { useNavigate } from 'react-router-dom'


function PostItem({post}) {
  const navigate = useNavigate()

  const viewPost = () => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.text}</p>
      <p><em>{post.username}, {post.inserted_at}</em></p>
      <button onClick={viewPost}>
        Read Me
      </button>
    </div>
  )
}


export default PostItem
