const express=require('express');
const https=require('https'); 
const bodyParser= require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){
    res.sendFile(__dirname+"/index.html");
    });

app.post("/",function(req,res){
    var city=req.body.cityName;
    console.log(city);
    const key= "57e4aeb97c82f494ba9c1656bf05813c";
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+key+"&units=metric";
https.get(url,function(response){
    // console.log(response.statusCode);
    // console.log(response);
    // console.log(".....");
    response.on("data",function(data){
        var weather_data= JSON.parse(data);

        // console.log(data);
        // console.log(weather_data);
        var temp=weather_data.main.temp;
        res.write(city+" temp is "+temp);
        res.send();
    })
    
});

});
app.listen(3000,function(){
    console.log("Server running on port 3000");
});