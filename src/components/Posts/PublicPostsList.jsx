import { useEffect, useState } from 'react'
import axios from 'axios'
import PostPreviewItem from './PostPreviewItem.jsx'


function PublicPostsList() {
  useEffect(() => {
    fetchPublicPosts()
  }, [])
  
  const [ publicPosts, setPublicPosts ] = useState([])

  const fetchPublicPosts = () => {
    axios.get('/api/posts/public')
      .then((response) => setPublicPosts(response.data))
      .catch((error) => console.log('fetchPublicPosts fail:', error))
  }

  return (
    <section>
      {
        publicPosts.map((post) => (
          <PostPreviewItem key={post.id} post={post} />
        ))
      }
    </section>
  )
}


export default PublicPostsList
