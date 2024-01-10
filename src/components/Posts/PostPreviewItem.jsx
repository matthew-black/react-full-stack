// TO-DO: expose DELETE, EDIT, and PUBLIC/PRIVATE actions
//        to logged-in users if the post belongs to them
import { useNavigate } from 'react-router-dom'


function PostPreview({ post }) {
  const navigate = useNavigate()

  const viewPost = () => {
    navigate(`/posts/${post.id}`)
  }

  const shortenedText = post.text.split('.')[0] + '...'

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{shortenedText}</p>
      <p><em>{post.username}, {post.inserted_at}</em></p>
      <button onClick={viewPost}>
        Read Me
      </button>
    </div>
  )
}


export default PostPreview
