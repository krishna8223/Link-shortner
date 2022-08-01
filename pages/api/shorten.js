import Link from "../../model/link.model";
import connect from "../../db";


connect()
export default async function handler(req,res){
    let longUrl = req.body.longUrl
    console.log(longUrl);
    console.log(typeof longUrl);
    
    if(!longUrl || longUrl.length <= 0 || longUrl == ''){
       return res.json({status:false,error:'please write the url'})
    }

    let validUrl = getValidUrl(longUrl)

    const shortUrl = getShortUrl(4)
    
    const checkUrl = await Link.findOne({longUrl:validUrl})

    validUrl = validUrl.split(" ").join("")

    if(checkUrl){
        return res.status(200).json({status:'ok',shortUrl:checkUrl.shortUrl})
    }

    const save =await new Link({longUrl:validUrl , shortUrl}).save()
    
    return res.status(200).json({status:'ok',message:'Success saved to database',shortUrl})


}

function getShortUrl(l) {
    let shortUrl = ''
    const alphabets = 'ABCDEFGHIJKEMNOPQRSTUVWXYZabckefghiklmnopqrstuvwxyz123456789'

    for(let i=0;i<=l;i++){
        const value =  Math.floor( Math.random()*alphabets.length)
        shortUrl += alphabets[value]
    }
    return shortUrl
}

function getValidUrl(link) {
    if(link.indexOf('http://')==0 || link.indexOf('https://')==0){
        return link
    }
    else{
        return `https://${link}`
    }
}