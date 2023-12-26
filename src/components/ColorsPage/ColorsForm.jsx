import { useState } from 'react'
import axios from 'axios'


function ColorsForm({colors, fetchColors}) {
  const [colorInput, setColorInput] = useState('')

  const createColor = (event) => {
    event.preventDefault()

    if (!colors.map(c => c.name).includes(colorInput)) {
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
    <form>
      <input 
        type="text"
        placeholder="Add a color"
        value={colorInput}
        onChange={(e) => {setColorInput(e.target.value.toLowerCase())}}
      />
      <button onClick={createColor}>Submit</button>
    </form>
  )
}


export default ColorsForm
