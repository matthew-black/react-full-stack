import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../contexts/AuthContext.jsx'


function HomePage() {
  const [publicPosts, setPublicPosts] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/posts/public'
    })
  }, [])

  return (
    <div>
      <h2>Home Page:</h2>

      <h3>Recent Public Blog Posts:</h3>

    </div>
  )
}


export default HomePage
