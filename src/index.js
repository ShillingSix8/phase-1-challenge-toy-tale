const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container")

let addToy = false;
let toyCollection = document.querySelector('#toy-collection')
let url = 'http://localhost:3000/toys';

const toyFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function toyPost(toyList){
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': toyList.name.value,
      'image': toyList.image.value,
      'likes': 0
    })
  })
  .then(response => response.json())
  .then((toyObject) => {
    let newToy = renderToys(toyObject)
    toyCollection.append(newToy)
  })
}

console.log(toyPost);

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toyAvatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'likeBtn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'like'
  btn.addEventListener('click', (event) => {
    console.log(event.target.dataset);
    likes(event)
  })

  let toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  toyCard.append(h2, img, p, btn)
  toyCollection.append(toyCard)
}

// document.addEventListener("DOMContentLoaded", () => {
  
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        toyPost(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  })

// toyFetch()
// .then(toys => {
// toys.forEach(toy => {
//     renderToys(toy)
//   })
// })
