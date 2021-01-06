
function renderOneRecipe(id) {

 fetch(`http://localhost:3000/api/v1/recipes/${id}`)
 .then(r => r.json())
 .then(recipeData => {
     
const recipeName = document.querySelector(".recipe-name")
const description = document.querySelector(".description")
const ingredients = document.querySelector(".ingredients")
const directions = document.querySelector(".directions")
const image = document.querySelector(".image")


recipeName.textContent = recipeData.name
description.textContent = recipeData.description
image.src = recipeData.imgUrl


const ingredArray = recipeData.ingredients.split(",")

ingredients.innerHTML = ""
directions.innerHTML = ""


ingredArray.forEach(ingred => {
    const li = document.createElement("li")
    li.textContent = ingred 
    ingredients.append(li)
})

const direcArray = recipeData.directions.split(".")

direcArray.forEach(direc => {
    const li = document.createElement("li")
    li.textContent = direc
    directions.append(li)
   })
 })
}

 const recipeContainer = document.querySelector(".navContainer")

 fetch("http://localhost:3000/api/v1/recipes")
  .then(r => r.json())
  .then(recipeArray => {
      recipeArray.forEach(recipeObj => {

    const div = document.createElement('div')

        div.innerHTML = `
        <div class="container">
        <div class="top-left">${recipeObj.name}</div>
        <div class="top-right">Favorite</div>
        <img class="showImg" data-id="${recipeObj.id}" src="${recipeObj.imgUrl}" alt="placeholder" style="max-width: 500px;" />
        <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
        </div>
        <br>
        `
        recipeContainer.append(div)

      
      
      const stars = div.querySelector(".bottom-left")
      const favorite = div.querySelector(".top-right")
      const imgClick = div.querySelector('img')
   
      favorite.addEventListener("click", event => {
          if (event.target.style.backgroundColor == "linen") {
              event.target.style.backgroundColor = "crimson"
          }
          else {
              event.target.style.backgroundColor = "linen"
          }
      })

      let count = 0
      stars.addEventListener("click", event => {
            console.log(event.target.innerHTML)
            
            count++
            console.log(count)
            
          if (count == 1) {
            event.target.innerHTML = `&#9733; &#9734; &#9734; &#9734; &#9734;`
          }
          else if (count == 2) {
            event.target.innerHTML = `&#9733; &#9733; &#9734; &#9734; &#9734;`
          }
          else if (count == 3) {
            event.target.innerHTML = `&#9733; &#9733; &#9733; &#9734; &#9734;`
          }
          else if (count == 4) {
            event.target.innerHTML = `&#9733; &#9733; &#9733; &#9733; &#9734;`
          }
          else if (count == 5) {
            event.target.innerHTML = `&#9733; &#9733; &#9733; &#9733; &#9733;`
          }
          else if (count > 5) {
            count = 0
            event.target.innerHTML = `&#9734; &#9734; &#9734; &#9734; &#9734;`
          }
      })

      imgClick.addEventListener("click", event => {
          let recipeId = event.target.dataset.id
          renderOneRecipe(recipeId)
      })
    })

})

renderOneRecipe(1)
