import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Posts/Post.jsx'
import CommentsList from '../components/Comments/CommenstList.jsx'


function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = () => {
    axios({
      method: 'GET',
      url: `/api/posts/${id}`
    })
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        console.log('fetchPost fail:', error)
        if (error.response.status === 400) {
          navigate('/bad_request', {replace: true})
        }
      })
  }

  return (
    <div className="dev-outline">
      <h2>Post Page:</h2>
      <Post post={post} />

      <h4>Comments:</h4>
      <CommentsList comments={post.comments}/>
    </div>
  )
}


export default PostPage
