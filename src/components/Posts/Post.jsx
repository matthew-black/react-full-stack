// TO-DO: expose DELETE, EDIT, and PUBLIC/PRIVATE actions
//        to logged-in users if the post belongs to them

function Post({ post }) {

  return (
    <section>
      <h3>{post.title}</h3>
      <p>{post.text}</p>
      <p><em>{post.username}, {post.inserted_at}</em></p>
    </section>
  )
}


export default Post

