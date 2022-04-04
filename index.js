const express = require('express')
const https = require ('https')

const app = express()

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.listen(3000,()=>{console.log("Sever Started at 3000")})


app.get('/', (req,res)=> res.render('home'))
app.get('/data', (req,res)=> res.render('data'))

app.post('/', (req,res)=>{
    const city = req.body.city
    const apiKey = "5732d3d6d0f8dfb10a34ba542cb5caae"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + unit

    https.get(url, (result)=>{
        console.log(result.statusCode)

        result.on("data", (data)=>{
            const weather = JSON.parse(data);
            const condition = weather.weather[0].main
            let current = ""
            let pressure = weather.main.pressure * 0.0009869233
            pressure = pressure.toFixed(2)
            console.log(condition)
            if(condition === "Clear"){
                current = "https://static.videezy.com/system/resources/previews/000/045/991/original/stockfootage0086.mp4"
            }else if(condition === "Clouds"){
                current = "https://static.videezy.com/system/resources/previews/000/048/301/original/TL-24-05-19-file-1P.mp4"
            }else if(condition === "Haze"){
                current = "https://static.videezy.com/system/resources/previews/000/046/742/original/Heavy_Dark_Rain_Clouds.mp4"
            }else if(condition === "shower rain" || condition === "rain" || condition === "mist"){
                current = "https://static.videezy.com/system/resources/previews/000/051/316/original/_DSC5794.mp4"
            }else{
                current = "https://static.videezy.com/system/resources/previews/000/032/857/original/grasswind3.mp4"
            }

            res.render("data", {city: city,currentSend: current,currentCondition: weather,pressure: pressure})
        })
    })
})