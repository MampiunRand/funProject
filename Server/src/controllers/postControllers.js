const prisma = require('../../prisma/index');
const io = require('../infrastructure/socket');

//create a new post
exports.createPost = async(req, res, next) => {
    try {
        const {slug, title, body, author} = req.body
        
        const result = await prisma.post.create({
            data:{
                slug,
                title,
                body,
                author: {connect: {id: author}}
            }
        });
        io.getIO().emit('post', { action: 'create', post:result});
        res.status(200).json({
            success:true,
            post:result
        });
    } catch (error){
        res.status(500).json({
            success:false,
            error:error.message})
    }
}

//updating an existing post
exports.updatePost = async (req, res, next) => {
    const {id}= req.params;
    const {title, body} = req.body;

    try{
        const result = await prisma.post.update({
            where: { id: id},
            data:{
                title: title,
                body: body
            }
        });
        res.status(200).json({
            success:true,
            post:result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Post with ${id} does not exists`});
    }
}

//delete post
exports.deletePost = async (req, res, next) => {
     const {id}= req.params
    console.log('id :',id);
     try {
        
        const result = await prisma.post.delete({
            where: {id: id}
        });
        result && res.status(200).json({success:true});

     } catch (error) {
        res.json({
            success:false,
            error: `Post with ${id} does not exists`});
     }
}

//get all post
exports.getPosts = async (req, res, next) => {
    try{
        const result = await prisma.post.findMany();
        const count = await prisma.post.count();
        res.json({
            success:true,
            posts:result,
            count
        })
    } catch(error){
        res.json({error: `NO post was found`})
    }
}
