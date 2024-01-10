function CommentsList({ comments }) {

  return (
    <section>
    {
      comments && comments.map((comment) => (
        <div key={comment.id}>
          {comment.text}
          <p><em>{comment.username}, {comment.inserted_at}</em></p>
        </div>
      ))
    }
    </section>
  )
}


export default CommentsList
