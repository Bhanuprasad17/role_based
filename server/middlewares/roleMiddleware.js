
export const isAdmin = async(req,res,next) => {
    if(req.user.role != 'Admin'){
        res.json({
            message : "Forbidden: Admins only"
        })
    }
    next()
}