
// --- read & set environment variables with the dotenv package
require("dotenv").config();

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);