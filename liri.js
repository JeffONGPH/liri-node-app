require("dotenv").config();

var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request")
var fs = require("fs");


var task = process.argv[2];
var criteria = process.argv[3];


switch (task) {

    case 'my-tweets':
    myTweets();                  
      break;                        

    case 'spotify-this-song':
      spotifySong();
      break;

    case 'movie-this':
      movieThis();
      break;

    case 'do-what-it-says':
      doWhat();
      break;

  }



//TWITTER
function myTweets (){
    var client = new Twitter(keys.twitter);

  var params = {screen_name: 'nodejs', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            var tweetList= ('Number: ' + (i + 1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
            console.log(tweetList);
          }
    }
  })
};//my tweets


//SPOTIFY
function spotifySong() {
    var spotify = new Spotify(keys.spotify);

    var searchQuery; 

    if (criteria=== undefined){
        searchQuery = "the sign ace of base"
    }else {
        searchQuery = criteria
    }

    spotify.search({ type: 'track', query: searchQuery }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }else
       
      console.log(JSON.stringify(data,null,4)); 

      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[3].preview_url); 
      console.log("Album: " + data.tracks.items[0].album.name);
      })
};//spotify



//MOVIE
function movieThis() {
  var searchQuery;
  if (criteria === null){
    searchQuery = "Mr. Nobody,"
  }else{
    searchQuery = criteria
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + searchQuery + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function(err, res, body) {

    if (!err && res.statusCode === 200) {

      var object = JSON.parse(body)
      console.log(JSON.stringify(object,null, 4))

      if (object.Title !== "Undefined"){
      console.log("Title: " + object.Title);
      console.log("Release Year: " + object.Year);
      console.log("IMDB Rating: " + object.imdbRating);
      console.log("Rotten Tomatoes Rating: " + object.Ratings[1].Value); 
      console.log("Country: " + object.Country);
      console.log("Language: " + object.Language);
      console.log("Plot: " + object.Plot);
      console.log("Actors: " + object.Actors);
      }else {
        console.log("No such Movie")
      }
    }
  });
}//movie 

//DO WHAT IT SAYS 
function doWhat () {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data)

    
  });
}//do what it says


