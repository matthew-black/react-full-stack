function PostItem({post}) {

  return (
    <div>
      <h4>{post.title}</h4>
      <p>{post.text_content}</p>
      <p>--<em>{post.username} at {post.inserted_at}</em></p>
    </div>
  )
}


export default PostItem
