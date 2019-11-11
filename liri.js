require('dotenv').config();
var fs = require('fs');
var axios = require('axios');
var Spotify = require('node-spotify-api');
var moment = require('moment');

// KEYS //
var keys = require('./keys');

// SPOTIFY //
var spotify = new Spotify(keys.spotify);

// ARGUMENTS // 
var value = process.argv.slice(3);
var request = process.argv[2];

switch (request) {
    case 'concert-this':
        bandsInTown(value);
        break;
    case 'spotify-this-song':
        // Tried to get the default to work but I couldn't figure it out. 
        // if (value === ' ') {
        //     value = 'The Sign';
        // }
        spotifyRequest(value);
        break;
    case 'movie-this':
        // Tried to get the default to work but I couldn't figure it out. 
        // if (value === ' ') {
        //     value = 'Mr. Nobody';
        // }
        omdbRequest(value);
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}

function bandsInTown(artist) {
    artist = artist.join(('+'));
    var concertUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

    axios.get(concertUrl)
        .then(function (response) {
            console.log(`
        **** NEXT UPCOMING SHOW **** \n
        Name of Venue: ${response.data[0].venue.name}
        Venue Location: ${response.data[0].venue.city}
        Date of the Event: ${moment(response.data[0].datetime).format('L')}
        \n`);
        }).catch(function (error) {
            console.log(error);
        });
};

function spotifyRequest(song) {
    spotify.search({ type: 'track', query: song, limit: 5 })
        .then(function (data) {
            if (data) {
                console.log(`
                Artist(s): ${data.tracks.items[0].album.artists[0].name}
                Song Name: '${data.tracks.items[0].name}'
                Preview: ${data.tracks.items[0].preview_url}
                Album: ${data.tracks.items[0].album.name}
                `);
            }
            else if (err) {
                return console.log('Error occurred: ' + err);
            }
        });
};

function omdbRequest(movie) {
    movie = movie.join(('+'));
    var movieUrl = `http://www.omdbapi.com/?apikey=8c0c7a4f&t=${movie}`;

    axios.get(movieUrl)
        .then(function (data) {
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
            console.log(error);
        });
};

function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function (error, fileData) {
        var readFileData = fileData.split(',');
        spotifyRequest(readFileData[1]);
    });
};
