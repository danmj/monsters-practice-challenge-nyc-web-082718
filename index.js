document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("monster-container")
  const monsterFormContainer = document.getElementById('create-monster')
  const backButton = document.getElementById('back')
  const forwardButton = document.getElementById('forward')
  const monsterBox = document.createElement('ul')
  container.appendChild(monsterBox)


  fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(monsters => {
      monsters.forEach((monsterObj) => {
        if(monsterObj.id < 51) {
          makeMonsterCards(monsterObj)
        }
      })
    })


  function makeMonsterCards(monsterObj) {
    const monsterListItem = document.createElement('li')
    monsterListItem.innerHTML = `<b>Name:</b> ${monsterObj.name}
                                 <br>
                                 <b>Age:</b> ${monsterObj.age}
                                 <br>
                                 <b>Description:</b> ${monsterObj.description}
                                 <br>
                                 <p></p>`
    monsterBox.appendChild(monsterListItem)
  }


  (function createMonsterForm() {
    const monsterForm = document.createElement('form')
    monsterForm.innerHTML = `<hr>
                             <p>Create a new monster:</p>
                             <input id="name-input" type="text" name="name" placeholder="Add Name" value=''/>
                             <input id="age-input" type="text" name="age" placeholder="Add Age" value=''/>
                             <input id="description-input" type="text" name="description" placeholder="Add Description" value=''/>
                             <input id="submit-button" type="submit" value="Submit"/>
                             <hr>`
    monsterFormContainer.appendChild(monsterForm)

    // submitButton = document.getElementById('submit-button')
    // nameInput = document.getElementById('name-input')
    // ageInput = document.getElementById('age-input')
    // descInput = document.getElementById('description-input')
  })()
  // createMonsterForm()



  function sendNewMonsterToDatabase(name, age, description) {
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age,
        description
        // name: name,
        // age: age,
        // description: description
      })
    })
  }

  function appendNewMonster(name, age, description) {
    monsterBox.appendHTML = `<li><b>Name:</b>${name}</li>
                             <li><b>Age:</b> ${age}</li>
                             <li><b>Description:</b> ${description}</li>`
  }

  document.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = event.target.querySelector("#name-input").value
    const age = event.target.querySelector("#age-input").value
    const description = event.target.querySelector("#description-input").value
    sendNewMonsterToDatabase(name, age, description)
    appendNewMonster(name, age, description)
  })


  // function displayNextFiftyMonsters() {
  //   fetch('http://localhost:3000/monsters')
  //     .then(res => res.json())
  //     .then(monster => {
  //       monster.forEach((monsterObject) => {
  //         if(monsterObject.id > 50 %% monsterObject.id <101) {
  //           makeMonsterCards()
  //         }
  //       })
  //     })
  // }
  //
  // forwardButton.addEventListener('click', () => {
  //   displayNextFiftyMonsters()
  // })





})
