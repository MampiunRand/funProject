const prisma = require('../../prisma/index');
const cookieToken = require('../utils/cookieToken');

//user signup

exports.signup = async(req, res, next) => {
  try {
    const {name, email, password, role} = req.body
    console.log("name",name);
    console.log("email",email);
    console.log("password",password);
    //check
    if(!name || !email || !password){
      throw new Error('please provide all fields')
    }

    const user = await prisma.user.create({
      data:{
        name,
        email,
        password,
        role
      }
    })
    //send user a token   
    cookieToken(user, res);
  } catch(error) {
      throw new Error(error)
  }
}

exports.login = async(req, res, next)=>{
  try {
    const {email, password} = req.body
    if(!email || !password) {
       throw new Error('Please provide email and password');
    }

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user){
      throw new Error('User not found');
    }

    //password mismatch
    if (user.password !== password){
      throw new Error('password is incorrect')
    }
    cookieToken(user, res);
  } catch (error) {
    res.status(500).json({Error:error.message});
  }
}

exports.logout = async(req, res, next)=>{
  try {
    res.clearCookie('token');
    res.json({
      success: true
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.update= async(req, res, next) => {
  const {id}=req.params;
  const {role}=req.body;
  try{
    const result = await prisma.user.update({
        where: { id: id},
        data:{
            role: role
        }
    });
    res.json(result);
} catch (error) {
    res.json({error: `User with ${id} does not exists`});
}
}

exports.getManyUsers=async(req, res, next)=>{
  try{
    const pageNumber = 1; // change this to the page number you want
    const pageSize = 5; // number of items per page

    const results = await prisma.user.findMany({
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    res.json(results);
  }catch (error) {
    res.json({error:error.message})
  }
}