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

async function queryBlog(){
    const result = await Blog
        .find({ author: 'Amna Javed' }) 
        .limit(2)
        .sort({ title : 1 })
        .select({ 'title': 1 , 'tags': 1 })
    console.log(result);
}

queryBlog();