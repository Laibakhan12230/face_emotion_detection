import { useEffect, useState } from 'react'

import API from '../api'

export default function History() {

  const [history, setHistory] = useState([])

  useEffect(() => {

    fetchHistory()

  }, [])

  const fetchHistory = async () => {

    const response = await API.get('/history')

    setHistory(response.data)
  }

  return (

    <div className='min-h-screen bg-[#050816] text-white p-10'>

      <h1 className='text-4xl font-bold text-cyan-400 mb-10'>

        Emotion History

      </h1>

      <div className='space-y-5'>

        {
          history.map((item, index) => (

            <div
              key={index}
              className='bg-[#0b1220] border border-cyan-500/10 p-5 rounded-2xl flex justify-between'
            >

              <div>

                <h2 className='text-2xl font-bold'>

                  {item.emotion}

                </h2>

                <p className='text-gray-400'>

                  Confidence:
                  {' '}
                  {(item.confidence * 100).toFixed(1)}%

                </p>

              </div>

              <div className='text-cyan-400 font-bold'>

                AI DETECTED

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}