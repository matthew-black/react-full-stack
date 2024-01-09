import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
function Post({post}) {

  return (
    <section>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <p><em>{post.username}, {post.inserted_at}</em></p>
    </section>
  )
}


export default Post

