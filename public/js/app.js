console.log('Client side javascript file is loaded!')


fetch('http://localhost:3000/weather?address=%27kathmandu%27').then((response)=>{

response.json().then((data)=>{
    if(data.error)
    {
        console.log(data.error)
    }
    else {
        console.log(data.location)
       
    }
})
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
e.preventDefault()//prentDefault behaviour of refreshing browser

const location = search.value

messageone.textContent='Loading ...'
messagetwo.textContent=''

fetch('/weather?address='+location+'').then((response)=>{  //http://localhost:3000 hatyo heroko bata run huda

response.json().then((data)=>{
    if(data.error)
    {
        messageone.textContent=data.error
    }
    else {
        messageone.textContent=data.location
        messagetwo.textContent=data.forecast
       
    }
})
})


})