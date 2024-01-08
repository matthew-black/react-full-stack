import { useEffect, useState } from 'react'
import axios from 'axios'

import PostItem from '../components/Posts/PostItem.jsx'


function HomePage() {
  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    fetchMyPosts()

  }, [])

  const fetchMyPosts = () => {
    axios({
      method: 'GET',
      url: '/api/posts'
    })
      .then((response) => {
        setMyPosts(response.data)
      })
      .catch((error) => {
        console.log('fetchMyPosts fail:', error)
      })
  }

  return (
    <div>
      <h2>My Posts Page:</h2>

      <h3>My Blog Posts:</h3>
      <section>
        {
          myPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))
        }
      </section>
    </div>
  )
}


export default HomePage
