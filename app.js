const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const constants = require('./constants');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

let fetchQueryResultData = (query, callback) => {
    console.log('query is -> ', query);
    let finalResponse = [];
    request(`https://api.themoviedb.org/3/search/movie?api_key=${constants.KEY}&query=${query}`, (error, response, responseBody) => {
        if (error){
            console.log(error);
            return;
        }
        else{
            respons = JSON.parse(responseBody);
            respons.results.forEach((entity) => {
                finalResponse.push({
                    id: '#' + entity.original_title.toString(),
                    title: entity.original_title,
                    summary: entity.overview,
                    poster: entity.poster_path,
                    date: entity.release_date,
                    votes: entity.vote_count,
                    ratings: entity.vote_average
                });
            });
            return callback(finalResponse);
        }
    });
};

app.get('/results', (req, res)=>{
    let queryParam = req.query.movieName;
    console.log(queryParam);
    if (queryParam){
        fetchQueryResultData(queryParam, (movies) => {
            console.log(movies);
            console.log("Movies are this");
            res.render('results', {movies: movies, query: queryParam});
        });
    }
});

app.get('/search', (req, res)=>{
    res.render('index');
});

app.get('/', (req, res) => {
    res.redirect('/search');
});


app.listen(5000, ()=>{
    console.log("App fired up at port 5000.");
});
