import { useState, useEffect } from 'react'
import axios from 'axios'
import ColorsForm from './ColorsForm'
import ColorsList from './ColorsList'


function ColorsPage() {
  const [colors, setColors] = useState([])

  useEffect(() => {
    fetchColors()

    return () => {
      setColors([])
    }
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
    <>
      <ColorsForm colors={colors} fetchColors={fetchColors} />
      <ColorsList colors={colors} fetchColors={fetchColors}/>
    </>
  )
}


export default ColorsPage
