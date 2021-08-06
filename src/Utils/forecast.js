 const request = require('request')


 const forecast = (latitude, longtitude, callback)=>
 {

 
const url = 'http://api.weatherstack.com/current?access_key=0517e681311f2fc41a94f8854ae51d94&query='+ latitude +',' + longtitude + 'units=f'
request({
     url, json: true
}, (error, {body})=>{ //destructing is used here

    if (error) //low level error 
    {
        callback('unable to connect to the', undefined)
    }
    else if (body.error){
        callback('error from body to level', undefined) //top level error like query missing

    }
    else
    {

   // console.log('the current tempr is '+ response.body.current.temperature  + 'Thers is a feel like ' + response.body.current.feelslike + 'temprature')
   callback(undefined,   body.current.temperature + ' is current temperature' + body.current.feelslike +' is feels like ')
   

}
} )
 }

 module.exports= forecast