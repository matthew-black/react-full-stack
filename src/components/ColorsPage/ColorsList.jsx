import ColorsItem from './ColorsItem.jsx'


function ColorsList({colors, fetchColors}) {
  return (
    <ul>
      {
        colors.map((color) => (
          <ColorsItem key={color.id} color={color} fetchColors={fetchColors} />
        ))
      }
    </ul>
  )
}


export default ColorsList
