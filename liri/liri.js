var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var request = require('request');

var fs = require('fs');

var spotify = new Spotify({
    id: '460b599a2baa437496ff922c963d4325',
    secret: '535da339a9ce4a24b713680180a47bc1',
});

var getSong = function (songName) {
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s):' + songs[i].artists[0].name);
            console.log('song name: ' + songs[i].name);
            console.log('preview song:' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('______________________________');
        }

    });

}

var getConcert = function (bandName) {

    request('https://rest.bandsintown.com/artists/' + bandName + '/events?app_id=codingbootcamp', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body); 

            console.log('name of the venue: ' + jsonData[0].venue.name);
            console.log('venue location: ' + jsonData[0].venue.city + ', ' + jsonData[0].venue.region);
            console.log('date of event ' + jsonData[0].datetime)
        }
    });
}



var getMovie = function (movieName) {

    request('http://www.omdbapi.com/?i=tt3896198&apikey=73965eb9&t=' + movieName + '&y=&plot=short&r=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);

            console.log('Title: ' + jsonData.Title);
            console.log('Year: ' + jsonData.Year);
            console.log('Rated: ' + jsonData.Rated);
            console.log('IMDB Rating: ' + jsonData.imdbRating);
            console.log('Country: ' + jsonData.Country);
            console.log('Language: ' + jsonData.Language);
            console.log('Plot: ' + jsonData.Plot);
            console.log('Actors: ' + jsonData.Actors);

        } else {
            console.log(error);
        }
    });
}

var dowhatitsays = function () {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var dataArr = data.split('|');
        dataArr.forEach(function (item) {
            var operationArr = item.split(',');
            if (operationArr.length == 1) {
                pick(operationArr[0]);
            } else if (operationArr.length == 2) {
                pick(operationArr[0], operationArr[1]);
            }
        });
    });
}

var pick = function (caseData, functionData) {
    switch (caseData) {
        case 'spotify-this-song':
            getSong(functionData);
            break;
        case 'movie-this':
            getMovie(functionData);
            break;
        case 'concert-this':
            getConcert(functionData);
            break;
        case 'do-what-it-says':
            dowhatitsays();
            break;
        default:
            console.log('LIRI does not know that');
    }
}

pick(process.argv[2], process.argv[3]);