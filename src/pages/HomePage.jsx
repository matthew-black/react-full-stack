import { useEffect, useState } from 'react'
import axios from 'axios'

import PostItem from '../components/Posts/PostItem.jsx'


function HomePage() {
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
        console.log(response.data)
        setPublicPosts(response.data)
      })
      .catch((error) => {
        console.log('fetchPublicPosts fail:', error)
      })
  }

  return (
    <div>
      <h2>Home Page:</h2>

      <h3>Recent Public Blog Posts:</h3>
      <section>
        {
          publicPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))
        }
      </section>
    </div>
  )
}


export default HomePage
