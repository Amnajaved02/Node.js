// Import Modules
const Joi = require("joi");
const express = require("express");

const app = express()

app.use(express.json());

// List of genres
const genres = [
    {id:1, genre:"Comdey"},
];

// Middleware route to handle get request
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});

// Middleware route to handle retreive 
app.get('/api/genres/:id',(req,res)=>{

    // search if the genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre){
        return res.status(400).send("Genre Doesn't Exist");
    };

    res.status(200).send(genre);
});

// Middleware route to handle post request
app.post('/api/genres',(req,res)=>{

    // Validate the genre
    const { error } = validategenre(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // search if the genre already exists
    const genre_found = genres.find(g => g.genre === req.body.genre);
    console.log(genre_found)
    if (genre_found){
        return res.status(400).send('Genre Already exists');
    };
    
    const genre = {
        id : genres.length + 1,
        genre : req.body.genre
    }
    genres.push(genre) 
    return res.status(201).send(genre)

});

// Middleware route to handle put request
app.put('/api/genres/:id',(req,res)=>{
    const genre_found = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre_found){
        return res.status(400).send("Genre Doesn't Exist");
    };
    
    const { error } = validategenre(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    genre_found.genre = req.body.genre
    return res.send(genre_found)

});

// Middleware route to handle delete request
app.delete('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre){
        return res.status(400).send("Genre Doesn't Exist");
    };
    
    const index = genres.indexOf(genre)
    genres.splice(index,1)
    return res.send(genre)
});

// Validation function for genre 
function validategenre(genre) {
    const schema = {
      genre: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
  }
  

app.listen(5000);