
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
var searchTerm = process.argv.slice(3).join("");  // - joins remaining arguments for search

console.log("HOW TO SEARCH: " + searchMethod);
console.log("SEARCH TERM(s): " + searchTerm);

// =============== SWITCH STATEMENT ===============

switch (searchMethod) {

    // --- bands in town
    case "concert-this":
        bandsInTownURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp";
        console.log("bandsURL: " + bandsInTownURL);

        getBandsInTown();
        break;

    // --- spotify
    case "spotify-this-song":

        getSpotify();
        break;


    // --- omdb
    case "movie-this":
        omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm;
        console.log("omdbURL: " + omdbURL);

        getOmdb();
        break;

    // --- read random.txt
    case "do-what-it-says":
        doWhatItSays();
        break;

    default: console.log("invalid choice");