require('dotenv').config();

// AXIOS // 
const axios = require('axios'); 

// KEYS //
var keys = require('./keys.js');

// Spotify //
const spotify = require('node-spotify-api');
var Spotify = new Spotify(keys.spotify); 

// OMDB KEYS // 


// make LIRI so it can take in following commands from terminal 
// 'concert-this'
// 'spotify-this-song'
// 'movie-this'
// do-what-it-says'

// WHAT COMMANDS LOOK LIKE

// 1. `node liri.js concert-this <artist/band name here>`

//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

//      * Name of the venue

//      * Venue location

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

var concertRequest = 'concert-this'; 
var songRequest = 'spotify-this-song';
var movieRequest = 'movie-this'; 

switch(process.argv.slice(2)){
    case(concertRequest):
        bandsInTown();
    break;
    case(songRequest):
        //include spotify function; 
    break; 
    case(movieRequest):
        //include omdb function; 
    break;
}

function bandsInTown(){

var artist = process.argv.slice(2)

var concertUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`; 

axios.get(concertUrl)
    .then(function(respose){
        // revisions - you will want to make these concert URLs go thru JSON object to find specified information. For date of event use moment.js to format it properly. 
        console.log(`
        Name of Venue: ${concertUrl[0].venue.name}
        Venue Location: ${concertUrl[0].venue.location}
        Date of the Event: ${concertURL[0].datetime}`);
    }).catch(function (error) {
        // handle error
        console.log(error);
    });
};






