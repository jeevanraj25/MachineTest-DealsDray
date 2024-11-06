import jwt from "jsonwebtoken";
import cookie from "cookie-parser";


const isAuth = async (req, res, next) => {
      

    try {
        const token =req.cookies.token
        //   console.log(req.cookies);
            if(!token){

                return res.status(400).json({
                    msg:"token not found"
                })
            } 
           
            const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY);
            if(!decode){

                return res.status(400).json({  
                    msg:"invalid token"
                })
            }
           
            req.id = decode.userId;
            next();

    } catch (error) {
        console.log(error);
    }
   
}



export default isAuth;