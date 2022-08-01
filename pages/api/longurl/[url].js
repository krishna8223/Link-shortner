import Link from "../../../model/link.model"
import connect from "../../../db"


connect()
async function getLongUrl(req,res) {
    // console.log(req);
    // console.log(req.query.url);
    const longUrl =await Link.findOne({shortUrl:req.query.url})
    // console.log(longUrl);
    res.json({status:'ok',longUrl})
    

}

export default getLongUrl