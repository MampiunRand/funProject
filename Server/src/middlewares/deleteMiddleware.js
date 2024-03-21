const prisma = require('../../prisma/index');

const jwt = require('jsonwebtoken')

const deletedPostMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token){
            throw new Error('You are not logged in');
        }
        const {id}=req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const post = await prisma.post.findUnique({
            where: { id },
        });

        if(decoded.userId != post.authorId){
            throw new Error('you are not the author of the post');
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = deletedPostMiddleware