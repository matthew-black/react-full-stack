import { useState } from 'react'
import axios from 'axios'


function CommentForm({postId, fetchPostComments}) {
  const [textContent, setTextContent] = useState('')

  const createComment = (e) => {
    e.preventDefault()

    axios({
      method: 'POST',
      url: '/api/comments',
      data: { textContent, postId }
    })
      .then(() => {
        setTextContent('')
        fetchPostComments()
      })
      .catch((error) => {
        console.log('createComment fail:', error)
      })
  }

  return (
    <form onSubmit={createComment}>
      <textarea
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
        placeholder="write a comment"
        cols="40" 
        rows="5"
        wrap="hard"></textarea>
      <button>Submit</button>
    </form>
  )
}


export default CommentForm
