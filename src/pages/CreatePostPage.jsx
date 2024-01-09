import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [textContent, setTextContent] = useState('')  

  const navigate = useNavigate()

  const createPost = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: '/api/posts',
      data: { title, textContent }
    })
      .then(() => {
        navigate('/my_posts') // TO-DO navigate to /posts/:id
      })
      .catch((error) => {
        console.log('createPost fail:', error)
      })
  }

  return (
    <div>
      <h2>Create Post Page:</h2>
      <form onSubmit={createPost}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          type="text" />
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="write a blog post"
          cols="40" 
          rows="20"
          wrap="hard"></textarea>
        <button>Submit</button>
      </form>
    </div>

  )
}


export default CreatePostPage
