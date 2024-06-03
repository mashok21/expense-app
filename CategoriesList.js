import axios from "axios"

export default function CategoriesList (props) {

  const {categories, handleCategoryRemoveComponent} = props
  const urlCat = `http://localhost:3010/api/categories`

  const handleCategoryRemove = (category) => {
    const urlId = `${urlCat}/${category._id}`
    axios.delete(urlId)
    .then(response=>{
      handleCategoryRemoveComponent(response.data)
    })
    .catch(err=>{
      console.error(err)
    })
  }
  
  return (
    <div>
      <ul>
          {categories.map((category, i) => (
            <li key={i}> {category.name}<button onClick={() => handleCategoryRemove(category)}>remove category</button></li>
          ))}
      </ul>
    </div>
  )
}

