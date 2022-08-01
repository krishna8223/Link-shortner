import mongoose from "mongoose";


function connect(params) {
    
    if(mongoose.connections[0].readyState){
        return
    }
    else{

        mongoose.connect(`${process.env.MONGO_URL}`).then(()=>{
            console.log('Database connected');
        })
    }    
}

export default connect