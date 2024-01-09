import { useEffect, useState } from 'react'
import axios from 'axios'
import PostItem from './PostPreview.jsx'


function PublicPostsList() {
  const [publicPosts, setPublicPosts] = useState([])

  useEffect(() => {
    fetchPublicPosts()
  }, [])

  const fetchPublicPosts = () => {
    axios({
      method: 'GET',
      url: '/api/posts/public'
    })
      .then((response) => {
        setPublicPosts(response.data)
      })
      .catch((error) => {
        console.log('fetchPublicPosts fail:', error)
      })
  }

  return (
    <section>
      {
        publicPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))
      }
    </section>
  )
}


export default PublicPostsList
