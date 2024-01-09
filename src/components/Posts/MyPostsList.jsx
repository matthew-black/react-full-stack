import { useEffect, useState } from 'react'
import axios from 'axios'
import PostItem from './PostItem.jsx'


function MyPostsList() {
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
    <section>
      {
        myPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))
      }
    </section>
  )
}


export default MyPostsList
