const coor= require("./utitles/gecode")
const path = require("path")
const express= require("express")
const hbs= require("hbs")
//app
const app= express()
const port= process.env.PORT || 3000
//paths
const publicdirctirypath = path.join(__dirname,"../public")
const viewpath= path.join(__dirname,"../templetes/views")
const partialspath= path.join(__dirname,"../templetes/partils")
//app use
app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(publicdirctirypath))
//app get
app.get("",(req,res)=>{
    res.render("index",{
        title: "weather ",
        name : "asaad darwish"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about me ",
        name : "asaad darwish"
    })
})
app.get("/help",(req,res)=>{
    res.render("help",{
        title: "help page",
        name : "asaad darwish"
    })
})
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: "you must provide a search "
        })
    }
    res.send({
        products: {}
    })
})
    

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error:"must provide an address"
        })
    }
    coor.gecode(req.query.address,(error,data)=>{
        if (error){
          return res.send({
            error: error
          })
       }
       coor.forecast(data. latitude,data.longitude,(error,forecastdata)=>{
           if(error){
              return  res.send({
                error: error
              })
           }
           res.send({
              location: data.location,
              weather: forecastdata
           })
          
      })
      })
})
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title: "404",
        name:"asaad darwısh",
        errormsg:"this help articale wasnt found"
    })
})
 

app.get("*",(req,res)=>{
    res.render("404",{
        title: "404",
        name:"asaad darwısh",
        errormsg:"page not found"
    })
})
 
app.listen(port,()=>{
    console.log("the server is up on "+ port)
})