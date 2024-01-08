import { useAuthContext } from '../../contexts/AuthContext.jsx'


function AboutPage() {
  const { user } = useAuthContext()

  return (
    <div>
      <h2>About Page:</h2>
      {
        user.id ?
          <>
            <p>This is a blog! In fact, it's a nice blog! You are logged-in, so you can do all the things:</p>
            <ul>
              <li>Read any public blog post that strikes your fancy!</li>
              <li>Leave comments on any public blog post!</li>
              <li>Write a blog post! Optionally make it public!</li>
              <li>Edit or delete any of your own blog posts!</li>
            </ul>
            <p>It is nice to be logged-in, eh?</p>
          </> 
                :
          <>
            <p>This is a blog! In fact, it's a nice blog! You aren't currently logged-in, so you can really only:</p>
            <ul>
              <li>Read any public blog post that strikes your fancy!</li>
            </ul>
            <p>If you want to do more than that, you should totally register and/or log in!</p>
          </>
      }
    </div>
  )
}


export default AboutPage
