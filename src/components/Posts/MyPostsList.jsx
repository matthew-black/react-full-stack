import { useEffect, useState } from 'react'
import axios from 'axios'
import PostPreview from './PostPreviewItem.jsx'


function MyPostsList() {
  useEffect(() => {
    fetchMyPosts()
  }, [])

  const [ myPosts, setMyPosts ] = useState([])

  const fetchMyPosts = () => {
    axios.get('/api/posts')
      .then((response) => setMyPosts(response.data))
      .catch((error) => console.log('fetchMyPosts fail:', error))
  }

  return (
    <section>
      {
        myPosts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))
      }
    </section>
  )
}


export default MyPostsList
