const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/playground')
    .then(()=> console.log("Connected to MongoDB"))
    .catch((err)=> console.log("Error Connecting to MongoDB ",err))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    tags: [String],
    date: { type: Date, default: Date.now()},
    isPublished: Boolean

});

const Blog = mongoose.model('Blog',blogSchema);

async function createBlog(){
    const blog = new Blog({
        title: "Second MongoDB Blog",
        author: "Amna Javed",
        description: "This is my Second mongodb document.",
        tags: ['Node','MongoDB','Test'],
        isPublished: false
    })
    
    const result = await blog.save();
    console.log(result);
}

createBlog();