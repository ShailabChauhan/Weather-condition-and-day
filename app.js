if(process.env.NODE_ENV !== "production")
{
    require("dotenv").config();
}
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){

    // res.send("Server is up and running.");
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res)
{
    console.log(req.body.cityName);
    // console.log("Post request recieved.");
    const query = req.body.cityName;
    const apikey = process.env.APIKEY;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey+ "&units="+ unit;

    https.get(url, function(response)
    {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data);
            const object ={
                name: "shailab",
                favoriteGame: "carrom"
            }
            console.log(weatherdata);
            console.log(JSON.stringify(object));
            const temp = weatherdata.main.temp;
            console.log(temp);
            const description = weatherdata.weather[0].description;
            console.log(description);
            const icon = weatherdata.weather[0].icon;
            const imageurl= "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
            res.write("<p> The weather description is " + description + "</p>")
            res.write("<h1> The temperatur in "+ query + " is " + temp + " degree celcius. </h1>" );
            res.write("<img src=" + imageurl +">");
            res.send()
        }) 
    });

})


app.listen(3000, function(){
console.log("Server is running on port 3000.");
})