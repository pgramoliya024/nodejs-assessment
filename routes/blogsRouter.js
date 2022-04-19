const express = require('express');
const router = express.Router();
const auth = require('../helpers/authAPI')
const blogRouter = require('../contollers/blogController')


router.post('/addblog',auth.authAPI , blogRouter.addBlog);
router.post('/updateblog',auth.authAPI , blogRouter.updateBlog);
router.delete('/deleteblog',auth.authAPI , blogRouter.deleteBlog);


module.exports =router;