import { useRouter } from 'next/router'
import React , {useEffect} from 'react'
import axios from 'axios'

const Url = () => {
    const router = useRouter()
    // const shortUrl = router.query.url
    // console.log(shortUrl);

    useEffect(()=>{
        if(!router.isReady){
            return
        }
        const func = async () => {
            await getLongUrl()
        }
        func()
    },[router.isReady])
    
    async function getLongUrl(params) {
        const shortUrl = router.query.url
        console.log(router.query);
        console.log(shortUrl , "3333333");

        console.log('request send');
        if(shortUrl != undefined){

            const result  = await axios.get(`/api/longurl/${shortUrl}`)
            window.location.replace(result.data.longUrl.longUrl)
        }
    }

  return (
      <div className='wait-page'>
          <h1 className='wait'> Please Wait ....</h1>
       </div>
  )
}

export default Url