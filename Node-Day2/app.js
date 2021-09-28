const Joi = require('joi');
const express = require('express');

const app = express();

const courses = [
    { id: 1, name: 'Software Engineering'},
    { id: 2, name: 'Programming'},
    { id: 3, name: 'Operating Systems'}
]

// Middlewares
app.use(express.json())

app.get('/',(req,res) => {
    console.log("In middleware 2");
    res.send("<h1>Hello!!</h1>");
});


app.get('/api/courses',(req,res) => {
    res.send([1,2,3,4,5]);
});

app.get('/api/courses/:id',(req,res) => {
    res.send(req.params.id);
});

app.post('/api/courses',(req,res) => {
    const schema = {
        name = Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }
});

app.put('api/course/:id',(req,res)=>{
    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id));
    if (!course){
        res.status(404).send('Course Not Found');
        return 
    };

    const schema = {
        name = Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error.details[0].message)
        return 
    }

    course.name = req.body.name
    return res.send(course)

})

app.delete('api/course/:id',(req,res)=>{
    const id = req.params.id;
    const course = courses.find(c => c.id === parseInt(id));
    if (!course){
        return res.status(404).send('Course Not Found');
    };

    const course_index = courses.indexOf(course)
    courses.splice(course_index,1)

    return res.send(`Deleted course with ${id} `)

})

app.listen(5000)