const request= require("request")
const chalk= require("chalk")


const gecode= (address,callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYXNhYWRlcmVyNSIsImEiOiJjbDVrenY3YngwZXh1M29ueGE0anhnYTl6In0.rBqzabQnQuqzOez7hcnPzA"
    request({url: url , json:true},(error,response)=> {
        if(error){
            callback(chalk.red("unable to connect"),undefined)
        }
        else if (response.body.features.length == 0 ){
            callback(chalk.red("couldnt find the location try again"),undefined)
        }else {
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    }) 
}
const forecast= (latitude,longitude,callback)=>{
    const wurl= "http://api.weatherstack.com/current?access_key=71dde0ee8ccc797286357825fcae48c6&query="+latitude+" ,"+longitude+"&units=f"
    request({url:wurl, json: true},(error,response)=>{
        if(error){
            callback(chalk.red("unable to connect"),undefined)
        }
        else if ( response.body.error){
            callback(chalk.red("couldnt find the location try again"),undefined)
        }
        else{
            callback(undefined,"the temperature is "+ response.body.current.temperature+" and it does look "+ response.body.current.weather_descriptions[0])
        }

    })

    }

module.exports= {
    gecode: gecode,
    forecast: forecast,
    
}
  
