const prisma = require('../../prisma/index');

const jwt = require('jsonwebtoken')

const isLoggedIn = async(req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error('You are not logged in');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })
        next();
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

module.exports = isLoggedIn
