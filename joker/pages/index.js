import Head from 'next/head'
import { useState } from 'react'
import TypeAnimation from 'react-type-animation'
import axios from 'axios'

// bg-gradient-to-b from-[#8BC6EC] to-[#9599E2]
const gifs = [
  'https://media.giphy.com/media/7A4sn0mYeCxQH32ZR4/giphy.gif',
  'https://media.giphy.com/media/cICnR2OC65xcfSCzFV/giphy.gif',
  'https://media.giphy.com/media/4cjgnb2VUb04/giphy.gif',
  'https://media.giphy.com/media/3o6ZsWXXP3F2VZx41a/giphy.gif',
  'https://media.giphy.com/media/B0yHMGZZLbBxS/giphy.gif',
  'https://media.giphy.com/media/ZbIOc7y74fpdsdmBve/giphy.gif',
  'https://media.giphy.com/media/H3SjlxDJ3PXFSWyyow/giphy.gif',
  'https://media.giphy.com/media/WbM84DXnRIosN8khpH/giphy.gif',
  'https://media.giphy.com/media/igaf4LVoojpCSBQHg6/giphy.gif',
  'https://media.giphy.com/media/UrPPgKj7eqfhrJyqSo/giphy.gif',
  'https://media.giphy.com/media/a8lNDU0GH2ny0kLFzF/giphy.gif',
  'https://media.giphy.com/media/pQmWjYrz39YAg/giphy.gif',
]

export default function Home() {
  const [bio, setBio] = useState('')
  const [modelType, setModelType] = useState('zero-shot')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function handleSwitch(caller = 'zero-shot') {
    if (caller === 'few-shot') {
      setModelType('few-shot')
      setOutput('')
      setBio('')
    } else {
      setModelType('zero-shot')
      setOutput('')
      setBio('')
    }
  }
  async function handleClick() {
    if (bio.trim().length > 0) {
      console.log(modelType)
      setIsLoading(true)
      axios
        .post(`http://127.0.0.1:5000/api/${modelType}/`, { data: bio })
        .then((res) => {
          setOutput(res.data.res)
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
          setIsLoading(false)
        })
    } else {
      alert('Cant be Empty')
    }
  }
  return (
    <div className="relative">
      <Head>
        <title>Roaster 🐔</title>
        <meta name="description" content="Roast People" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute w-screen h-screen -z-10 top-0 left-0 grid grid-cols-4 grid-rows-3 ">
        {gifs.map((el) => (
          <div key={el} className="">
            <img src={el} className="h-full"></img>
          </div>
        ))}
      </div>
      <main className="relative w-screen h-screen flex flex-col justify-center items-center bg-[#000]/80  ">
        <div className="flex justify-center items-center space-x-10 mb-5">
          <button
            className={`text-sm font-mono font-bold ${
              modelType === 'zero-shot' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => handleSwitch('zero-shot')}>
            Zero Shot
          </button>
          <button
            className={`text-sm font-mono font-bold ${
              modelType === 'few-shot' ? 'text-white' : 'text-gray-500'
            }`}
            onClick={() => handleSwitch('few-shot')}>
            Few Shot
          </button>
        </div>
        {output && (
          <TypeAnimation
            cursor={true}
            sequence={[`${output}`]}
            wrapper="p"
            className="text-white font-mono text-xl mb-10 w-1/3"
          />
        )}

        <div>
          <textarea
            placeholder="How awesome are you? 😎"
            className="border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 h-[100px] w-[500px]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}></textarea>
          <button
            onClick={handleClick}
            className="bg-[#fff] flex justify-center items-center text-center px-4 py-2 text-black font-bold rounded-md w-[100px] justify-self-end cursor-pointer mt-5">
            {isLoading ? (
              <svg
                role="status"
                class="w-6 h-6 text-gray-200 animate-spin fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}
