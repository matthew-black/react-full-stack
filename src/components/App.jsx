import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header.jsx'
import ColorForm from './ColorForm.jsx'
import ColorList from './ColorList.jsx'

function App() {
  const [colors, setColors] = useState([])

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

  return (
    <div>
      <Header />
      <ColorForm colors={colors} fetchColors={fetchColors} />
      <ColorList colors={colors}/>
    </div>
  )
}

export default App
