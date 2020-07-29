const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/results', (req, res) => {
    res.render('results', {movies: [
        {
            title: "This is me now",
             summary: "sdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsf"
        },
        {
            title: "This is me then",
            summary: "sdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdf".substring(1, 20)
        },
        {
            title: "This is me now",
            summary: "sdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdfdsfsdfdsfsfdsfsdfsdfsdfsdf"
        }
    ]});
});

app.get('/search', (req, res)=>{
    let queryParam = req.query.movieName;
    console.log(queryParam);
    if (queryParam && queryParam.length){
        res.send('Please enter a movie name.');
    }
    else{
        res.render('index');
    }
});



app.listen(5000, ()=>{
    console.log("App fired up at port 5000.");
});
