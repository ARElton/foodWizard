
function renderOneRecipe(id) {

 fetch(`http://localhost:3000/api/v1/recipes/${id}`)
 .then(r => r.json())
 .then(recipeData => {
     
const recipeName = document.querySelector(".recipeName")
const description = document.querySelector(".description")
const ingredients = document.querySelector(".ingredients")
const directions = document.querySelector(".directions")
const image = document.querySelector(".image")

recipeName.textContent = recipeData.name
description.textContent = recipeData.description
image.src = recipeData.imgUrl

const commentList = document.querySelector("#commentList")
commentList.innerHTML = ""

recipeData.comments.forEach(com => {

    const commentInput = document.createElement("div")
    commentInput.innerHTML = `
    ${com.content}
    <br><br>`

    commentList.append(commentInput)
})


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
 const commentForm = document.querySelector("#commentForm")
 const commentList = document.querySelector("#commentList")
 
 commentForm.addEventListener("submit", event => {
     event.preventDefault()
 
     const commentInput = document.createElement("div")

     commentInput.innerHTML = `
     ${event.target.comment.value}
     <br>
     <button>Delete</button>
     <br><br>` 
 
     commentList.append(commentInput)

     const button = commentInput.querySelector("button")

     commentInput.addEventListener("click", event => {
         if (event.target == button) {
             commentInput.innerHTML = ""
         }
     })
    
     const commentValue = {
         recipe_id: id,
         content: event.target.comment.value,
     }
     console.log(commentValue)
 
     fetch(`http://localhost:3000/api/v1/recipes/${id}`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json"
     },
     body: JSON.stringify(commentValue)
 })
 .then(r => r.json())
 .then(commentObj =>
    console.log(commentObj))
 
 console.log(`http://localhost:3000/api/v1/recipes/${id}`)
 
     document.getElementById("commentForm").reset();
 })
 }


fetch("http://localhost:3000/api/v1/recipes")
.then(r => r.json())
.then(recipeArray =>
    recipeArray.forEach(recipeObj => 
        renderAllRecipes(recipeObj)
    ))

function renderAllRecipes(recipeObj) {
 const recipeContainer = document.querySelector(".navContainer")

//  fetch("http://localhost:3000/api/v1/recipes")
//   .then(r => r.json())
//   .then(recipeArray => {
//       recipeArray.forEach(recipeObj => {

    const div = document.createElement('div')

        div.innerHTML = `
        <br>
        <div class="container">
        <div class="top-left">${recipeObj.name}</div>
        <div class="top-right">Favorite</div>
        <img class="showImg" data-id="${recipeObj.id}" src="${recipeObj.imgUrl}" alt="placeholder" style="max-width: 500px;" />
        <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
        </div>
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
    }



const form = document.querySelector("#new-recipe-form")

form.addEventListener("submit", event => {
    event.preventDefault()

    const newRecipe = {
        name: event.target.recipeName.value,
        ingredients: event.target.ingredients.value,
        directions: event.target.directions.value,
        description: event.target.description.value,
        img_url: event.target.image.value
    }

   
console.log(event.target.directions.value)
console.log(newRecipe.imgUrl)
    // const div = document.createElement('div')

    div.innerHTML = `
    <br>
    <div class="container">
    <div class="top-left">${newRecipe.name}</div>
    <div class="top-right">Favorite</div>
    <img class="showImg" data-id="${newRecipe.id}" src="${newRecipe.imgUrl}" alt="placeholder" style="max-width: 500px;" />
    <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
    </div>
    `
    recipeContainer.append(div)



fetch("http://localhost:3000/api/v1/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newRecipe)
})
.then(response => response.json())
.then(recipeObj => {

console.log(recipeObj)
renderAllRecipes(recipeObj)
// const recipeContainer = document.querySelector(".navContainer")
// const div = document.createElement('div')
//   div.innerHTML = `
//   <br>
//   <div class="container">
//   <div class="top-left">${recipeObj.name}</div>
//   <div class="top-right">Favorite</div>
//   <img class="showImg" data-id="${recipeObj.id}" src="src/images/21600382.jpg" alt="placeholder" style="max-width: 500px;" />
//   <div class="bottom-left">&#9734; &#9734; &#9734; &#9734; &#9734;</div>
//   </div>
//   `
//   recipeContainer.append(div)
  document.getElementById("new-recipe-form").reset();
})
})


// const commentForm = document.querySelector("#commentForm")
// const commentList = document.querySelector("#commentList")

// commentForm.addEventListener("submit", event => {
//     event.preventDefault()

//     const commentInput = document.createElement("div")
//     commentInput.innerHTML = `
//     ${event.target.comment.value}
//     <br>
//     <button>Delete</button>
//     <br><br>` 

//     commentList.append(commentInput)
//     document.getElementById("commentForm").reset();

//     // fetch("http://localhost:3000/api/v1/recipes", {
//     // method: "POST",
//     // headers: {
//     //   "Content-Type": "application/json",
//     //   Accept: "application/json"
//     // },
//     // body: JSON.stringify(newRecipe)
    
//     const button = commentInput.querySelector("button")

//     commentInput.addEventListener("click", event => {
//         if (event.target == button) {
//             commentInput.innerHTML = ""
//         }
//     })
// })


//Login feature
const loginForm = document.querySelector("#login-form")

// loginForm.addEventListener("submit", handleLoginForm)

let handleLoginForm = (evt) => {
  evt.preventDefault()
  let userName = evt.target.username.value

fetch("http://localhost:3000/api/v1/login", {
  method: "POST",
  headers: {
    "Accespt": "Application/json",
    "content-type": "application/json"
  },
  body: JSON.stringify({
    username: userName
  })
})
.then(res => res.json())
.then(response => {
  if(response.id) {
    showRecipeInformation(response)
  } else {
    console.error(response.error)
  }
  })
}

loginForm.addEventListener("submit", handleLoginForm)

renderOneRecipe(1)
