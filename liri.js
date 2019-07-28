var axios = require("axios");

 require('dotenv').config();

var keys = require ("./keys")

var fs = require ("fs")
var rand = require("./random.txt")

var moment = require('moment');

moment().format();

var choice = process.argv[2];
if(choice === "movie-this"){
    var movieQuery = process.argv.slice(3).join(" ") 
    if(!movieQuery){
        movieSearch("Mr. Nobody")
        
    }
    else{
        movieSearch(movieQuery);
    }
}
else if(choice === "spotify-this-song" ){
   
var musicQuery = process.argv.slice(3).join(" ")
if(!musicQuery){
    musicSearch("The Sign by Ace of Base")
}
else{
    musicSearch(musicQuery);
}

}
else if (choice === "do-what-it-says"){
random();
}


function movieSearch(movie){


var movieUrl =  "http://www.omdbapi.com/?t="+ movie +"&apikey=d6ad3037";

axios.get(movieUrl)
 .then(function (response) {
   var jsonData= response.data;
   var movieData =[
    "Title: " + jsonData.Title,
    "Released: " + jsonData.Released,
    "Rating: " + jsonData.Rated,
    "Rotten Tomatoes: " + jsonData.Ratings[1].Value,
    "Country: " + jsonData.Country,
    "Language: " + jsonData.Language,
    "Plot: " + jsonData.Plot,
    "Genre: " + jsonData.Genre,
    "Actors: "  + jsonData.Actors,
   ]
   for(i=0; i<movieData.length ; i++){
       console.log(movieData[i]);
   }
 })
 .catch(function (error) {
   console.log(error);
 });
}

// music/////

function musicSearch(song){
    
    var spotify = require('node-spotify-api');
    var spotify = new spotify(keys.spotify);
       spotify 
       .search({ type: 'track', query: song })
 .then(function(response) { 
     var jsonMusic = response.tracks

    var musicData = [
        "Album Name: " + jsonMusic.items[0].album.name,
         "Artist: " + jsonMusic.items[0].artists[0].name,
         "Song: "  + jsonMusic.items[0].name,
         "Preview link: " + jsonMusic.items[0].external_urls.spotify

    ]
    for(i2 =0 ; i2 < musicData.length; i2++){
        console.log(musicData[i2])
    }
   
 })

 .catch(function(err) {
   console.log(err);
 });

 
}
function random(){

fs.readFile("./random.txt", "utf8",function(error,data){
if (error){
    return console.log(error)
}
var ranbArr = data;
console.log(ranbArr);
// console.log("1--------------------------------------------------------------------")
// console.log(ranbArr[1])
// console.log("1--------------------------------------------------------------------")
})
}


