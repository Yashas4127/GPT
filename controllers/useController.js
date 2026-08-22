

// login
// logout
// signup
// profie

export const login = async (req,res)=>{
    try{
        const {name,age,email,password}=req.body

        if(!name||!password ||!email){
           return req.json({
                message:"Some fileds are missing"
            })
        }
    }
    catch{

    }
}


export const logout = async (req,res)=>{
    try{

    }
    catch{
        
    }
}

export const signup = async (req,res)=>{
    try{

    }
    catch{
        
    }
}

export const profile = async (req,res)=>{
    try{

    }
    catch{
        
    }
}