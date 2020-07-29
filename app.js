const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


let fetchQueryResultData = (query, callback) => {
    console.log('query is -> ', query);
    let finalResponse = [];
    request(`https://api.themoviedb.org/3/search/movie?api_key=bbf5c216807a9cf1f1f3f2577210a8ad&query=${query}`, (error, response, responseBody) => {
        if (error){
            console.log(error);
            return;
        }
        else{
            respons = JSON.parse(responseBody);
            respons.results.forEach((entity) => {
                finalResponse.push({
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
    fetchQueryResultData(queryParam, (movies) => {
        console.log(movies);
        console.log("Movies are this");
        res.render('results', {movies: movies, query: queryParam});
    });
});

app.get('/search', (req, res)=>{
    res.render('index');
});



app.listen(5000, ()=>{
    console.log("App fired up at port 5000.");
});


