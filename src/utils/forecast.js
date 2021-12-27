const request = require('request')

const forecast = (latitude, longitude, callback) =>{
  const url = `http://api.weatherstack.com/current?access_key=765f827c0e19a0f30e2229c970ff1918&query=${latitude},${longitude}\&units=m`
  // const url = 'http://api.weatherstack.com/current?access_key=765f827c0e19a0f30e2229c970ff1918&query=' + latitude + ',' + longitude + '&units=m'
  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback('Unable to connect to weather station.', undefined);
    } else if (body.error) {
      callback('Please specify a valid location identifier.', undefined);
    } else {
      
      callback(undefined, `${body.current.weather_descriptions[0]} temperature: ${body.current.temperature} feelslike: ${body.current.feelslike}`);
      // (undefined, {
      //   description: body.current.weather_descriptions[0],
      //   temperature: body.current.temperature,
      //   feelslike: body.current.feelslike
      // });
    }

  })
}

module.exports= forecast