import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'


function PostPage() {
  const { id } = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = () => {
    axios({
      method: 'GET',
      url: `/api/posts/${id}`
    })
      .then((response) => {
        setPost(response.data)
      })
      .catch((error) => {
        console.log('fetchPost fail:', error)
        if (error.response.status === 400) {
          setPost(sternWarningFromInstructors)
        }
      })
  }

  return (
    <div className="dev-outline">
      <h2>Post Page:</h2>
      
      <section>
        <h3>{post.title}</h3>
        <p>{post.text}</p>
        <p><em>{post.username}, {post.inserted_at}</em></p>
      </section>

      <h4>Comments:</h4>
      <section>
      {
        post.comments && post.comments.map((comment) => (
          <div key={comment.id}>
            {comment.text}
            <p><em>{comment.username}, {comment.inserted_at}</em></p>
          </div>
        ))
      }
      </section>
    </div>
  )
}


export default PostPage


const sternWarningFromInstructors = {
  title: 'Shame on You',
  text: 'Stop monkeying around with this cool blog I built. Don\'t even try to say you weren\'t monkeying around. You so were! The server sent me a 400-level status code, so I know precisely what happened here. And oh dear me I am beginning to feel marginally more mad about it.\n\n😡😡😡😡😡\n\nAnyway, goodbye. This better not happen ever again. Ever.\n\nP.S. Even if it happens to be Thursday afternoon or something, I sincerely hope that your day feels like a Monday.\n\nP.P.S. If that\'s not the case, well, I guess I\'ll just have to conclude by wishing upon a star that you\'ll spill a jug of fish sauce on your favorite hair care accessory or discover that your nicest knapsack is not so nice. I even hope that both of those things happen simultaneously! That\'d be an extra big bummer if your plan for this evening was to make a big batch of Pad Thai while being on the lam! Because...THAT AIN\'T HAPPENIN\' NOW! Not with such a crummy knapsack and an EMPTY jug of fish sauce!',
  username: 'Matthew Black',
  inserted_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
  comments: [
    {
      id: 1,
      text: 'Agreed! No more monkeying around! Not sure about that business with the knapsack, but I fully endorse the general sentiment.',
      username: 'Key Clark',
      inserted_at: new Date(Date.now() - 1000 * 60 * 2).toISOString()
    },
    {
      id: 2,
      text: 'The next person to monkey around is in for it. And when I say in for it, I really mean to say I have a jug of fish sauce and I know how to use it.',
      username: 'Andrew Harasymiw',
      inserted_at: new Date(Date.now() - 1000 * 60 * 1).toISOString()
    },
    {
      id: 3,
      text: 'Stop! Just stop! 😭😭😭😭😭',
      username: 'Dane Smith',
      inserted_at: new Date().toISOString()
    }
  ]
}
