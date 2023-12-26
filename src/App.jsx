import { useState, useEffect } from 'react'
import axios from 'axios'
import viteLogo from '/vite.svg'

function App() {
  const [colors, setColors] = useState([])
  const [colorInput, setColorInput] = useState('')

  useEffect(() => {
    fetchColors()
  }, [])

  const fetchColors = () => {
    axios({
      method: 'GET',
      url: '/api/colors'
    })
      .then((response) => {
        setColors(response.data)
      })
      .catch((error) => {
        console.log('fetchColors fail:', error)
      })
  }

  const createColor = (event) => {
    event.preventDefault()

    if (!colors.includes(colorInput)) {
      axios({
        method: 'POST',
        url:'/api/colors',
        data: {
          color: colorInput
        }
      })
        .then((response) => {
          setColorInput('')
          fetchColors()
        })
        .catch((error) => {
          console.log('createColor fail:', error)
        })
    } else {
      alert('You are not allowed to create the same color twice.')
    }
  }

  return (
    <div>
      <h1>
        <img src={viteLogo} alt="Vite logo" />
        Hello.
        <img src={viteLogo} alt="Vite logo" />
      </h1>
      
      <form>
        <input 
          type="text"
          placeholder="Add a color"
          value={colorInput}
          onChange={(e) => {setColorInput(e.target.value.toLowerCase())}}
        />
        <button onClick={createColor}>Submit</button>
      </form>

      <ul>
        {
          colors.map(color => <li key={color}>{color}</li>)
        }
      </ul>
    </div>
  )
}

export default App
