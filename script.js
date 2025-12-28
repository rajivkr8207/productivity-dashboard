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




// day planner time script 
function dailyplainner() {
    const plainnerstyle = document.querySelector('.plainnerstyle')
    let hour = Array.from({ length: 18 }, function (_, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00`
    })
    let dayplaindata = JSON.parse(localStorage.getItem('dayplainerdata')) || {}

    let wholedaysum = ''
    hour.forEach((elem, idx) => {

        let savedata = dayplaindata[idx] || ''
        wholedaysum += `
    <div class="plannertime">
           <p>${elem}</p>
           <input id='${idx}' type="text" value='${savedata}' />
         </div>`
    })
    plainnerstyle.innerHTML = wholedaysum

    const Alldatainput = document.querySelectorAll('.plainnerstyle input')
    Alldatainput.forEach(function (elem) {
        elem.addEventListener('input', function (e) {
            console.log('kuch likh rha hai', e.target.value)
            dayplaindata[elem.id] = elem.value
            localStorage.setItem('dayplainerdata', JSON.stringify(dayplaindata))
        })
    })
}
dailyplainner()






const coderMotivationQuotes = [
    { id: 1, quote: "Code is not just written, it is crafted with patience.", author: "Arjun Mehta" },
    { id: 2, quote: "Every bug you fix makes you a better engineer.", author: "Rohit Sharma" },
    { id: 3, quote: "First make it work. Then make it right. Then make it fast.", author: "Kent Beck" },
    { id: 4, quote: "Programming is thinking, not typing.", author: "Casey Patton" },
    { id: 5, quote: "Great developers are not born; they are built through consistency.", author: "Aman Verma" },
    { id: 6, quote: "Code every day, even if only a little.", author: "Neeraj Singh" },
    { id: 7, quote: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
    { id: 8, quote: "Simplicity is the soul of efficient code.", author: "Austin Freeman" },
    { id: 9, quote: "Your future self will thank you for clean code.", author: "Kunal Shah" },
    { id: 10, quote: "A good programmer looks both ways before crossing a one-way street.", author: "Doug Linder" },
  
    { id: 11, quote: "Don’t fear errors; fear not learning from them.", author: "Sandeep Yadav" },
    { id: 12, quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { id: 13, quote: "Programming rewards discipline, not shortcuts.", author: "Rahul Mishra" },
    { id: 14, quote: "Every expert was once a beginner who refused to quit.", author: "Vikram Patel" },
    { id: 15, quote: "The best way to predict the future is to build it.", author: "Alan Kay" },
    { id: 16, quote: "Small commits lead to big systems.", author: "Aditya Rao" },
    { id: 17, quote: "Learning to code teaches you how to think.", author: "Steve Jobs" },
    { id: 18, quote: "Your keyboard is your tool; discipline is your power.", author: "Manish Kapoor" },
    { id: 19, quote: "A clean architecture reflects a clear mind.", author: "Deepak Joshi" },
    { id: 20, quote: "Struggle today, deploy confidently tomorrow.", author: "Harsh Vardhan" },
  
    { id: 21, quote: "Good code is written for humans first, machines second.", author: "Harold Abelson" },
    { id: 22, quote: "Consistency beats talent when talent stops practicing.", author: "Rajat Malhotra" },
    { id: 23, quote: "You don’t need motivation. You need discipline.", author: "Akhil Nair" },
    { id: 24, quote: "Refactoring is respect for your future self.", author: "Puneet Arora" },
    { id: 25, quote: "A programmer’s real skill is problem decomposition.", author: "Nikhil Jain" },
    { id: 26, quote: "Slow progress is still progress.", author: "Saurabh Gupta" },
    { id: 27, quote: "Code that works today should still make sense tomorrow.", author: "Mohit Agarwal" },
    { id: 28, quote: "Every failed build teaches precision.", author: "Yash Kulkarni" },
    { id: 29, quote: "Master fundamentals before chasing frameworks.", author: "Prateek Saxena" },
    { id: 30, quote: "Software is built one logical decision at a time.", author: "Ankit Tiwari" },
  
    { id: 31, quote: "Great developers automate boredom.", author: "Ravi Shankar" },
    { id: 32, quote: "Focus on clarity, performance will follow.", author: "Karthik Iyer" },
    { id: 33, quote: "Reading code is as important as writing it.", author: "Abhishek Pandey" },
    { id: 34, quote: "Every project teaches something no tutorial can.", author: "Siddharth Mehra" },
    { id: 35, quote: "Your mindset debugs before your IDE does.", author: "Varun Khanna" },
    { id: 36, quote: "Programming rewards patience more than intelligence.", author: "Rakesh Bansal" },
    { id: 37, quote: "Build things that solve realtimer problems.", author: "Amit Kulkarni" },
    { id: 38, quote: "The terminal teaches humilitytimer.", author: "Naveen Choudhary" },
    { id: 39, quote: "Readable code is professionaltimer code.", author: "Shubham Raj" },
    { id: 40, quote: "You grow every time you breaktimer and fix something.", author: "Tarun Malhotra" },
  
    { id: 41, quote: "A strong foundation outlives every framework.", author: "Piyush Agarwal" },
    { id: 42, quote: "Coding is persistence disguised as logic.", author: "Rohit Kulkarni" },
    { id: 43, quote: "Solve problems, not just tickets.", author: "Keshav Verma" },
    { id: 44, quote: "The best developers never stop learning.", author: "Nitin Bhatia" },
    { id: 45, quote: "Clean code reflects disciplined thinking.", author: "Arnav Singhal" },
    { id: 46, quote: "Every line of code is a decision.", author: "Sahil Kapoor" },
    { id: 47, quote: "Your skill grows where your effort stays consistent.", author: "Vivek Mishra" },
    { id: 48, quote: "Good software is built, not rushed.", author: "Kunal Arora" },
    { id: 49, quote: "Debugging builds patience and mastery.", author: "Mayank Tripathi" },
    { id: 50, quote: "Write code today that your future self will respect.", author: "Ritesh Chauhan" }
  ];



const quotes = document.querySelector('#quote-text')
const author = document.querySelector('#quote-author')


// // Motivational Quotes API Example
function fetchmotivation() {
    const randomno = Math.floor(Math.random()*coderMotivationQuotes.length)
    const data = coderMotivationQuotes[randomno]
    quotes.innerHTML = data.quote
    author.innerHTML = data.author
}



const timerdp = document.querySelector('#pomodoro-timer-display')
const starttimer = document.querySelector('#pomodoro-start')
const pausetimer = document.querySelector('#pomodoro-pause')
const resettimer = document.querySelector('#pomodoro-reset')
const breaktimer = document.querySelector('#pomodoro-break')
let TimerInterval = null
let timerun = 25*60


function startTimer() {
    clearInterval(TimerInterval)
    TimerInterval = setInterval(() => {
        const min = Math.floor(timerun/60)
        const second = Math.floor(timerun%60)
        if(timerun >0){
            timerun--
            timerdp.innerHTML = `${min}:${second}`
        }else{
            clearInterval(TimerInterval)

        }
    }, 10);
}

function pauseTimer() {
    clearInterval(TimerInterval)
}

function resetTimer(params) {
    clearInterval(TimerInterval)
    timerun = 25*60
    
}
