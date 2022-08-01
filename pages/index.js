import axios from 'axios'
import { useState ,useRef} from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const inputValue = useRef()

  const handleUrl = async (e) => {
    e.preventDefault()

    if(longUrl == '' || longUrl.indexOf(' ') != -1){
      alert("please give a valid link")
      return 
    }
    const result =await axios.post('/api/shorten',{longUrl})

    
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
      <h2>Your url is : <span className='copy' onClick={copyText} ref={inputValue}>{`${process.env.NEXT_PUBLIC_VERCEL_URL}/go/${shortUrl}`}</span> Click to copy text</h2>

    </>

  )
}
