const cards = document.querySelectorAll('.card')

const fullelem = document.querySelectorAll('.fullelem')

cards.forEach((elem) => {
    elem.addEventListener('click', function (dets) {
        const elem = fullelem[dets.target.id]
        elem.classList.remove('hidden')
    })
})

function backbtn(id) {
    fullelem[id].classList.add('hidden')
}

let alltasks = []



const form = document.querySelector('.leftform form')
let taskid = null
let updatetask = false
const title = document.querySelector('#title')
const desc = document.querySelector('#desc')
const imp = document.querySelector('#imp')
form.addEventListener('submit', function (e) {
    e.preventDefault()
    if (taskid && updatetask) {
        console.log('heelo');
        alltasks = alltasks.map((item, index) => {
            if (item.id == taskid) {
                return {
                    ...item,
                    title: title.value,
                    description: desc.value,
                    imp: imp.checked,
                }
            }
            return item
        })
        taskid = null;
        updatetask = false;
    } else {
        alltasks.push({
            id: Date.now(),
            title: title.value,
            description: desc.value,
            imp: imp.checked,
            completed: false,
        })
    }
    localStorage.setItem('todoapp', JSON.stringify(alltasks))
    renderalltaks()

    form.reset()

})


function renderalltaks() {
    const tasksadd = document.querySelector('.tasksadd')
    var sum = ''
    const todoapp = localStorage.getItem('todoapp')
    if (todoapp) {
        alltasks = JSON.parse(localStorage.getItem('todoapp'))
    }
    if (alltasks.length > 0) {
        alltasks.forEach((elem, index) => {
            sum += `
    <div class="tasks">
            <div class="lefttext">
              <p>${elem.title}</p>
              ${elem.imp ? '<span>imp</span>' : ''} 
            </div>
            <div class="rightbtn">
              <button onClick="completedtask(${elem.id})" >${elem.completed ? 'completed' : 'mark as complete'} </button>
              <button onClick="updatetodo(${elem.id})" id='${elem.id}'>update</button>
              
              <button class='delete deletebtn' onClick="deletetask(${elem.id})" id='${elem.id}'>delete</button>
            </div>
          </div>`
        })
    }

    tasksadd.innerHTML = sum
}



renderalltaks()





function updatetodo(id) {
    updatetask = true

    let filtertask = alltasks.filter((elem) => elem.id == id)
    title.value = filtertask[0].title
    desc.value = filtertask[0].description
    imp.checked = filtertask[0].imp
    taskid = filtertask[0].id
    console.log(filtertask);
}




const deletebtn = document.querySelectorAll('.deletebtn')

function deletetask(id) {
    let filtertask = alltasks.filter((elem) => elem.id != id)
    localStorage.setItem('todoapp', JSON.stringify(filtertask))
    renderalltaks()
}

function completedtask(id) {
    console.log(id);
    const maptask = alltasks.map((elem) => {
        if (elem.id == id) {
            elem.completed = true
        }
        return elem
    })
    localStorage.setItem('todoapp', JSON.stringify(maptask))
    renderalltaks()

}