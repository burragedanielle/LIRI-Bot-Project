require('dotenv').config();

var fs = require('fs');

// AXIOS // 
var axios = require('axios');

// KEYS //
var keys = require('./keys');

// Spotify //
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); 

//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

var value = process.argv.slice(3);
var request = process.argv[2];

switch (request) {
    case 'concert-this':
        bandsInTown(value);
        break;
    case 'spotify-this-song':
        spotifyRequest(value);
        break;
    case 'movie-this':
        omdbRequest(value);
        break;
}

function bandsInTown(artist) {

    artist = artist.join(('+'));

    var concertUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(concertUrl)
        .then(function(response) {
            // revisions - you will want to make these concert URLs go thru JSON object to find specified information. For date of event use moment.js to format it properly. 
            console.log(`
        Name of Venue: ${response.data[0].venue.name}
        Venue Location: ${response.data[0].venue.city}
        Date of the Event: ${response.data[0].datetime}`);
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
};

function spotifyRequest(song){
    spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
        if(data){
            var dataSongs = data;
            console.log(dataSongs);
        }
        else if (err) {
          return console.log('Error occurred: ' + err);
        }
    });
}

function omdbRequest(movie){
    movie = movie.join(('+'));
    var movieUrl = `http://www.omdbapi.com/?apikey=8c0c7a4f&t=${movie}`; 
    
    axios.get(movieUrl)
        .then(function(data){
            console.log(`
            Title of Movie: ${data.data.Title}
            Year: ${data.data.Year}
            Country: ${data.data.Country}
            Language: ${data.data.Language}
            Plot: ${data.data.Plot}
            Actors: ${data.data.Actors}
            IMDB Rating: ${data.data.imdbRating}
            `)
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
}
