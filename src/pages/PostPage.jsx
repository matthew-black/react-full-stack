import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../contexts/AuthContext.jsx'
import Post from '../components/Posts/Post.jsx'
import CommentForm from '../components/Comments/CommentForm.jsx'
import CommentsList from '../components/Comments/CommentsList.jsx'


function PostPage() {
  const { id: postId } = useParams()
  
  useEffect(() => {
    fetchPost()
  }, [postId])

  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [ post, setPost ] = useState({})

  const fetchPost = () => {
    axios.get(`/api/posts/${postId}`)
      .then((response) => setPost(response.data))
      .catch((error) => {
        console.log('fetchPost fail:', error)
        if (error.response.status === 400) {
          navigate('/bad_request', {replace: true})
        }
      })
  }

  const fetchPostComments = () => {
    axios.get(`/api/posts/${postId}/comments`)
      .then((response) => setPost({...post, comments: response.data}))
      .catch((error) => console.log('fetchPostComments fail', error))
  }

  return (
    <div>
      <h2>Post Page:</h2>
      <Post post={post} />

      <h4>Comments:</h4>

      { 
        user.id && <CommentForm
                      postId={postId}
                      fetchPostComments={fetchPostComments} />
      }

      <CommentsList comments={post.comments}/>
    </div>
  )
}


export default PostPage
