
const reqHandler = (reqhandler) =>{
    return (req, res, next)=>{
        Promise.resolve(
            reqhandler(req,res,next)
        ).catch(
            (err)=>{next(err)}
        )
    }
}


export { reqHandler }


// const async = (fn) => async(req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// } 
