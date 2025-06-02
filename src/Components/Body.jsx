import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import waitingIcon from '../assets/waiting.gif'
import ReactMarkdown from 'react-markdown'
import { getRecipeFromMistral } from '../huggingFaceApi.js'

function Body() {

  const [ingredients, setIngredients] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recipe, setRecipe] = useState("")

  const recipeSection = useRef(null)
  console.log(recipeSection)

  useEffect(()=>{
    if(recipeSection.current !==null && recipe !==""){
      recipeSection.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [recipe])

  const newIngredients = ingredients.map((cookingLists)=>{
      return (
        <li key={cookingLists}>{cookingLists}</li>
      )
  })

  const getIngredients = (formData)=>{
     const ingredintsFromInputField = formData.get('ingredients')
    if(!ingredintsFromInputField) return

     setIngredients((oldIngredients)=>{
      return [...oldIngredients, ingredintsFromInputField]
     })

     setShow(true)
  }
  
  async function getRecipe(){
    setLoading(true)//waiting for data to be fetched from an api
    const result = await getRecipeFromMistral(ingredients)
    setRecipe(result)
    setLoading(false)// when the data is fetched 
  }


  return (
    <main>
      <section className='form'>
        <form action={getIngredients}>
          <input 
            type="text"
            name="ingredients"
            aria-label='enter your list of ingredient'
            placeholder='e.g Tomato'
          />
          <button className='add-ingredient-btn'>Add ingredients</button>
        </form>
      </section>

      {show && <section className='ingredients-on-hand'>
        <h1 className='ingredients'>Ingredients on hand</h1>
        <ul>{newIngredients}</ul>
      </section>}

      {ingredients.length > 3 ? <section className='recipe-section'>
        <div ref={recipeSection}>
          <h2>Ready for a recipe?</h2>
          <p> Generate recipe from the list of the ingredients</p>
        </div>

        <button className='get-recipe-btn' onClick={getRecipe}>Get a recipe</button>
      </section> : null}
 
      {loading && <section className='waiting-img'>
        <img style={{width: 60, margin: '10px auto', display: 'block'}} src={waitingIcon} alt="waiting for response from the AI" />
        <p style={{fontSize: 20, color: 'whitesmoke'}}>Please wait while we prepare your delicious menu</p>
      </section>}

      <section style={{color:'white'}}>
        <ReactMarkdown>
          {recipe}
        </ReactMarkdown>
      </section>
    </main>
  )
}

export default Body
