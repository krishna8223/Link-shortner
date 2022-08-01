import axios from 'axios'
import { useState ,useRef} from 'react'
import Link from 'next/link'

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
      <h2>URL Shortner</h2>
      <h3> {`${process.env.MONGO_URL}`}</h3>

      <form onSubmit={handleUrl}>
        <input className='linkInput' type="text" placeholder='Enter URL' onChange={(e) => { setLongUrl(e.target.value) }} />
        <button type="submit">Get short URL</button>

      </form>
      <h2>Your url is : <span className='copy' onClick={copyText} ref={inputValue}>http://localhost:3000/go/{shortUrl}</span> Click to copy text</h2>

    </>

  )
}
