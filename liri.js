
// --- read & set environment variables with the dotenv package
require('dotenv').config();

// --- allows access to Spotify keys
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// --- read/write files | axios | moment 
var fs = require('fs');
var axios = require('axios');
var moment = require('moment');

// =============== GRABBING CL ARGUMENTS ===============
var searchMethod = process.argv[2];     // use this in switch statement
var userInput = process.argv.slice(3).join('');  // - joins remaining arguments for search

// =============== SWITCH STATEMENT ===============

switch (searchMethod) {

    // --- bands in town
    case 'concert-this':
        getBandsInTown();
        break;

    // --- spotify
    case 'spotify-this-song':
        getSpotify();
        break;

    // --- omdb
    case 'movie-this':
        getOmdb();
        break;

    // --- read random.txt
    case 'do-what-it-says':
        doWhatItSays();

        break;

    default: console.log(`invalid choice`);
}

// ========== FUNCTIONS: switch statement cases ==========
// -------------------------------------------------------

function getBandsInTown() {
    axios.get('https://rest.bandsintown.com/artists/' + userInput + '/events?app_id=codingbootcamp')
        .then(
            function (response) {

                // save date to variable & format with moment.js
                var date = response.data[0].datetime;
                var formattedDate = moment(date).format('MM/DD/YYYY');

                // === Display data for user
                console.log(`Venue Name: ${response.data[0].venue.name} || Venue Location: ${response.data[0].venue.city} || Venue Date: ${formattedDate}`);
            });
}

function getSpotify() {
    if (!userInput) {         //  No userInput, default search song: "The Sign"
        userInput = 'The Sign';
    }
    spotify.search({ type: 'track', query: userInput },
        function (err, data) {
            if (err) {
                return console.log(`Error occurred: ${err}`);
            }
            {
                // === Display data for user
                console.log(`Artist: ${data.tracks.items[0].artists[0].name} || Song: ${data.tracks.items[0].name} || Album: ${data.tracks.items[0].album.name} || URL: ${data.tracks.items[0].external_urls.spotify}`);
            }

        });
}

function getOmdb() {
    axios.get('http://www.omdbapi.com/?apikey=trilogy&t=' + userInput)
        .then(
            function (response) {
                // === Display data for user
                console.log(`Movie Title:  ${response.data.Title} || Year: ${response.data.Year} || IMDB Rating: ${response.data.imdbRating} || Rotten Tomatoes's Rating: ${response.data.Ratings[1].Value} || Country of Production : ${response.data.Country} || Language: ${response.data.Language} || Movie Plot Summary: ${response.data.Plot} || Main Cast: ${response.data.Actors}`)
            });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } console.log(`This is the data from randomtxt: ${data}`);

        // splits text by "," 
        var dataArr = data.split(",");
        searchMethod = dataArr[0];
        userInput = dataArr[1];

        // --- apply text to appropriate 
        if (searchMethod === 'concert-this') {
            getBandsInTown();
        } else if (searchMethod === 'spotify-this-song') {
            getSpotify();
        } else if (searchMethod === 'movie-this') {
            getOmdb();
        } { console.log(`no more text in file`) }
    });
};


