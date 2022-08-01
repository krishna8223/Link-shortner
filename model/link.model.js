import mongoose from 'mongoose'

const linkModel = new mongoose.Schema({
    shortUrl:{type:String},
    longUrl:{type:String}
})

export default mongoose.models.Link || mongoose.model('Link',linkModel)