import { useEffect, useState } from 'react'
import axios from 'axios'
import PostPreviewItem from './PostPreviewItem.jsx'


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
          <PostPreviewItem 
            key={post.id}
            post={post}
            fetchPosts={fetchMyPosts}
            isActionable={true} />
        ))
      }
    </section>
  )
}


export default MyPostsList
