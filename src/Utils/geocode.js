const request= require('request')

const geocode = (address , callback)=>
{

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZGlwYWtiaHVzYWwiLCJhIjoiY2tybGQ2MzlpMTMwNDJxb2I0dTV0YWs5cyJ9.s9NA4r3qCCQHG_KzteVZ7Q&limit=1'

    request({url: url, json:true} , (error, response)=>{
        if(error)
        {
            callback('unable to connect to location services', undefined)
        }
        else if (response.body.features.length === 0)
        {
            callback('unable to find location , Try another search', undefined)
        }
        else {
            callback(undefined, {
        latitude : response.body.features[0].center[1],
        longtitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
            })
        }
    } )

}
 
module.exports= geocode