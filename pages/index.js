import axios from 'axios'
import { useState ,useRef, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/header'

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
    setShortUrl('')
    Setloading(true)
    const result =await axios.post('/api/shorten',{longUrl})
    if(result.data){
      Setloading(false)
    }


    
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
    <main className='main flex justify-center items-center'>
      <section className='hero-section'>


      {/* <Header/> */}
      <h1 className='heading'>Shortnen <span> Links </span></h1>

      <form onSubmit={handleUrl}>
        <input className='linkInput' type="text" placeholder='Enter or paste url' onChange={(e) => { setLongUrl(e.target.value) }} />
        <button type="submit ">Get short URL</button>

      </form>
      {
        loading?
        <h3 className='result'>Loading...</h3>
        :
        ''
      }
      {
        shortUrl!=''?
        <h2 className='result'>Your url is : <span className='copy' onClick={copyText} ref={inputValue}>{`${baseUrl}/go/${shortUrl}`}</span> Click to copy text</h2>
        :
        ''

      }

      </section>
    </main>
    </>

  )
}


{/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1e272e" fill-opacity="0.8" d="M0,128L60,154.7C120,181,240,235,360,224C480,213,600,139,720,122.7C840,107,960,149,1080,186.7C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg> */}