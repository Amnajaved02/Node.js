const Joi = require("joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const id_list = [];

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log("Connected to MongoDB"))
    .catch((err)=> console.log("Error Connecting to MongoDB ",err))

const blogSchema = new mongoose.Schema({
    genre: {
        type:String,
        minlength:5,
        maxlength:20,
        unique: true
    },
});


const Genre = mongoose.model('Genre',blogSchema);
async function createGenre(){
    const new_genre = new Genre({
        genre: "Suspense"
    })
    
    const result = await new_genre.save();
    console.log(result);

}

createGenre();

async function queryGenre(id){
    const result_query = await Genre
        .find({ _id: id }) 
        .limit(1)
    console.log(result_query);
    console.log(id_list[0])
}



// List of genres
const genres = [
    {id:1, genre:"Comdey"},
];

// Middleware route to handle get request
router.get('/',async(req,res)=>{
    const genres = await Genre.find()
    res.send(genres);
});

// Middleware route to handle retreive 
router.get('/:id',(req,res)=>{

    // search if the genre exists
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre){
        return res.status(400).send("Genre Doesn't Exist");
    };

    res.status(200).send(genre);
});

// Middleware route to handle post request
router.post('/',(req,res)=>{

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
router.put('/:id',(req,res)=>{
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
router.delete('/:id',(req,res)=>{
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

module.exports = router;