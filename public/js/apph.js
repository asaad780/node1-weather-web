




const weatherform= document.querySelector("form")
const search= document.querySelector("input")
const msgone= document.querySelector("#msg-1")
const msgtwo= document.querySelector("#msg-2")


weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const place= search.value
    msgone.textContent="loading.."
    msgtwo.textContent=""
    if(!place){
        return msgone.textContent="must provide a location"
    }
    fetch("http://localhost:3000/weather?address="+ place).then((response) => {
    response.json().then((data)=>{
       if(data.error){
        msgone.textContent=  data.error
       }else{
        msgone.textContent=data.location
        msgtwo.textContent= data.weather
       }
        
    })
})
})