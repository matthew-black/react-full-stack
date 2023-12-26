import axios from 'axios'


function ColorsItem({color, fetchColors}) {
  const deleteColor = () => {
    axios({
      method: 'DELETE',
      url: `/api/colors/${color.id}`
    })
      .then((response) => {
        fetchColors()
      })
      .catch((error) => {
        console.log('deleteColor fail:', error)
      })
  }

  return (
    <li>
      <button onClick={deleteColor}>🗑️</button>
      {color.name}
    </li>
  )
}


export default ColorsItem
