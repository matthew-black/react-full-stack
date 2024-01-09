import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CreatePostForm() {
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
      .then((response) => {
        console.log('response.data is:', response.data)
        const newPostID = response.data.id
        navigate(`/posts/${newPostID}`)
      })
      .catch((error) => {
        console.log('createPost fail:', error)
      })
  }

  const cancel = (e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
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
      <button onClick={cancel}>
        Cancel
      </button>
    </form>
  )
}


export default CreatePostForm
