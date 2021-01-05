
function renderOneRecipe(recipeData) {
const recipeName = document.querySelector(".recipe-name")
const description = document.querySelector(".description")
const ingredients = document.querySelector(".ingredients")
const directions = document.querySelector(".directions")
const image = document.querySelector(".image")


recipeName.textContent = recipeData.name
description.textContent = recipeData.description
image.src = recipeData.imgUrl


const ingredArray = recipeData.ingredients.split(",")


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
}

// function renderRecipeImage(recipeObj) {

//     console.log(recipeObj)
//     const recipeContainer = document.querySelector(".container")
//     const div = document.createElement('div')

//     div.innerHTML = `
//     <div class="top-left">${recipeObj.name}</div>
//     <div class="top-right">Favorite</div>
//     <img class="showImg" src="${recipeObj.imgUrl}" alt="placeholder" style="max-width: 500px;" />
//     <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
//     `
//     recipeContainer.append(div)
//     debugger
    // const showName = document.querySelector(".top-left")
    // const showImg = document.querySelector(".showImg")

    // showName.textContent = recipeObj.name 

    // recipeContainer

// }



fetch("http://localhost:3000/api/v1/recipes/1")
 .then(r => r.json())
 .then(recipeData => {
     renderOneRecipe(recipeData)
 })

 const recipeContainer = document.querySelector(".container")
 const div = document.createElement('div')

 fetch("http://localhost:3000/api/v1/recipes")
  .then(r => r.json())
  .then(recipeArray => {
      recipeArray.forEach(recipeObj => {
    
    
        div.innerHTML = `
        <div class="top-left">${recipeObj.name}</div>
        <div class="top-right">Favorite</div>
        <img class="showImg" src="${recipeObj.imgUrl}" alt="placeholder" style="max-width: 500px;" />
        <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
        `
        recipeContainer.append(div)
      })
  })