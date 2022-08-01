import axios from 'axios'
import { useState ,useRef, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [baseUrl, SetbaseUrl] = useState('')
  const [loading, Setloading] = useState('')
  const inputValue = useRef()

  useEffect(()=>{
    SetbaseUrl(window.location.origin)
  })
  // if( typeof window != 'undefined'){
    //  baseUrl = window.location.origin
  // }
  console.log(baseUrl);

  const handleUrl = async (e) => {
    e.preventDefault()

    if(longUrl == '' || longUrl.indexOf(' ') != -1){
      alert("please give a valid link")
      return 
    }
    Setloading(true)
    const result =await axios.post('/api/shorten',{longUrl})
    if(result.data){
      Setloading(false)
    }


    
    setShortUrl('')
    setShortUrl(result.data.shortUrl)

  }
  const copyText = () =>{
    const toCopy = inputValue.current.innerHTML
  navigator.clipboard.writeText(toCopy).then(()=>{
    alert('Copied')
  })
  
  }


  return (
    <>
     <Head>
        <title>Link Shortner</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h2>URL Shortner</h2>

      <form onSubmit={handleUrl}>
        <input className='linkInput' type="text" placeholder='Enter URL' onChange={(e) => { setLongUrl(e.target.value) }} />
        <button type="submit">Get short URL</button>

      </form>
      {
        loading?
        <h3>Loading...</h3>
        :
        ''
      }
      <h2>Your url is : <span className='copy' onClick={copyText} ref={inputValue}>{`${baseUrl}/go/${shortUrl}`}</span> Click to copy text</h2>

    </>

  )
}
