// TO-DO: expose DELETE, EDIT, and PUBLIC/PRIVATE actions
//        to logged-in users if the post belongs to them
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function PostPreview({ post, fetchPosts, isActionable=false }) {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const viewPost = () => {
    navigate(`/posts/${post.id}`)
  }

  const togglePublicPrivate = () => {
    axios.put(`/api/posts/${post.id}/toggle_visibility`)
      .then(() => fetchPosts())
      .catch((error) => console.log('togglePublicPrivate fail:', error))
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
      {
        isActionable && post.user_id === user.id &&
          <>
            <button onClick={togglePublicPrivate}>
              Set to { post.is_public ? 'Private' : 'Public' }
            </button>
            {/* <button>Edit</button> */}
            {/* <button>Delete</button> */}
          </>
      }
    </div>
  )
}


export default PostPreview
