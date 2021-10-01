const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

router.get('/', auth, async (req, res) => {
    const courses = [
        { id: 1, name: 'Software Engineering'},
        { id: 2, name: 'Programming'},
        { id: 3, name: 'Operating Systems'}
    ]
    
    res.send(courses);
});

module.exports = router; 