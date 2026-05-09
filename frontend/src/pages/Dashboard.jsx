import { useState } from 'react'

import {
  Shield,
  Activity,
  AlertTriangle,
  BrainCircuit,
  Upload,
  Moon,
  Sun
} from 'lucide-react'

import { Link } from 'react-router-dom'

import API from '../api'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'

const COLORS = [
  '#22c55e',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6'
]

export default function Dashboard() {

  const [image, setImage] = useState(null)

  const [emotion, setEmotion] = useState('')

  const [confidence, setConfidence] = useState(0)

  const [darkMode, setDarkMode] = useState(true)

  const [chartData, setChartData] = useState([])

  // DYNAMIC STATS

  const stats = [
    {
      title: 'TOTAL SCANS',
      value: chartData.length > 0 ? '1' : '0',
      icon: Shield,
      color: 'text-blue-400'
    },

    {
      title: 'DETECTED EMOTION',
      value: emotion || 'None',
      icon: AlertTriangle,
      color: 'text-red-400'
    },

    {
      title: 'AI CONFIDENCE',
      value: confidence
        ? `${(confidence * 100).toFixed(1)}%`
        : '0%',
      icon: Activity,
      color: 'text-yellow-400'
    },

    {
      title: 'MODEL STATUS',
      value: image ? 'ACTIVE' : 'IDLE',
      icon: BrainCircuit,
      color: 'text-green-400'
    }
  ]

  // TIMELINE DATA

  const timelineData = [
    { time: '07:00', value: 2 },
    { time: '08:00', value: 3 },
    { time: '09:00', value: 5 },
    { time: '10:00', value: 6 },
    { time: '11:00', value: 7 },
    { time: '12:00', value: 4 },
    { time: '13:00', value: 5 },
    { time: '14:00', value: 6 },
    { time: '15:00', value: 3 },
    { time: '16:00', value: 2 },
  ]

  // IMAGE UPLOAD

  const handleUpload = async () => {

    if (!image) {

      alert('Please upload image')

      return
    }

    const formData = new FormData()

    formData.append('file', image)

    const response = await API.post(
      '/predict',
      formData
    )

    setEmotion(response.data.emotion)

    setConfidence(response.data.confidence)

    const emotionChart = [
      {
        name: response.data.emotion,
        value: response.data.confidence * 100
      },
      {
        name: 'Others',
        value: 100 - (response.data.confidence * 100)
      }
    ]

    setChartData(emotionChart)
  }

  return (

    <div className={`${darkMode ? 'dark' : ''}`}>

      <div className='min-h-screen bg-[#050816] text-white'>

        {/* HEADER */}

        <div className='flex items-center justify-between px-10 py-6 border-b border-white/10'>

          <div>

            <h1 className='text-4xl font-bold tracking-wide text-cyan-400'>

              AI Emotion Analytics Dashboard

            </h1>

            <p className='text-gray-400 mt-2'>

              Advanced Deep Learning Emotion Detection System

            </p>

          </div>

          {/* NAVIGATION */}

          <div className='flex gap-4 items-center'>

            <Link
              to='/login'
              className='bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-xl font-bold transition-all duration-300'
            >

              Login

            </Link>

            <Link
              to='/signup'
              className='bg-purple-500 hover:bg-purple-400 text-white px-5 py-3 rounded-xl font-bold transition-all duration-300'
            >

              Signup

            </Link>

            <Link
              to='/history'
              className='bg-green-500 hover:bg-green-400 text-black px-5 py-3 rounded-xl font-bold transition-all duration-300'
            >

              History

            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className='bg-white/10 p-3 rounded-xl border border-white/10 hover:scale-105 transition-all duration-300'
            >

              {
                darkMode
                  ? <Sun />
                  : <Moon />
              }

            </button>

          </div>

        </div>

        {/* TOP STATS */}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10'>

          {
            stats.map((item, index) => {

              const Icon = item.icon

              return (

                <div
                  key={index}
                  className='bg-[#0b1220] border border-cyan-500/10 rounded-2xl p-6 shadow-2xl hover:scale-105 transition-all duration-300'
                >

                  <div className='flex items-center justify-between'>

                    <div>

                      <p className='text-gray-400 text-sm'>

                        {item.title}

                      </p>

                      <h2 className='text-3xl font-bold mt-3'>

                        {item.value}

                      </h2>

                    </div>

                    <Icon className={`w-10 h-10 ${item.color}`} />

                  </div>

                </div>

              )
            })
          }

        </div>

        {/* TIMELINE + UPLOAD */}

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 px-10'>

          {/* TIMELINE */}

          <div className='lg:col-span-2 bg-[#0b1220] rounded-3xl border border-cyan-500/10 p-6 shadow-2xl'>

            <h2 className='text-2xl font-bold mb-6 text-cyan-400'>

              Emotion Activity Timeline

            </h2>

            <ResponsiveContainer width='100%' height={300}>

              <AreaChart data={timelineData}>

                <defs>

                  <linearGradient id='colorEmotion' x1='0' y1='0' x2='0' y2='1'>

                    <stop offset='5%' stopColor='#22c55e' stopOpacity={0.8}/>

                    <stop offset='95%' stopColor='#22c55e' stopOpacity={0}/>

                  </linearGradient>

                </defs>

                <CartesianGrid strokeDasharray='3 3' stroke='#1e293b'/>

                <XAxis dataKey='time' stroke='#94a3b8'/>

                <YAxis stroke='#94a3b8'/>

                <Tooltip />

                <Area
                  type='monotone'
                  dataKey='value'
                  stroke='#22c55e'
                  fillOpacity={1}
                  fill='url(#colorEmotion)'
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

          {/* UPLOAD */}

          <div className='bg-[#0b1220] rounded-3xl border border-cyan-500/10 p-6 shadow-2xl'>

            <h2 className='text-2xl font-bold mb-6 text-cyan-400'>

              Upload Image

            </h2>

            <div className='border-2 border-dashed border-cyan-500/20 rounded-2xl p-10 text-center'>

              <Upload className='w-16 h-16 mx-auto text-cyan-400 mb-4' />

              <input
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
                className='text-sm text-gray-300'
              />

              <button
                onClick={handleUpload}
                className='mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-105'
              >

                Analyze Emotion

              </button>

            </div>

          </div>

        </div>

        {/* CHART + IMAGE STATUS */}

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-10'>

          {/* PIE CHART */}

          <div className='bg-[#0b1220] rounded-3xl border border-cyan-500/10 p-6 shadow-2xl'>

            <h2 className='text-2xl font-bold mb-6 text-cyan-400'>

              Emotion Distribution

            </h2>

            <ResponsiveContainer width='100%' height={300}>

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey='value'
                  outerRadius={100}
                  innerRadius={60}
                >

                  {
                    chartData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))
                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* IMAGE STATUS */}

          <div className='bg-[#0b1220] rounded-3xl border border-cyan-500/10 p-6 shadow-2xl'>

            <h2 className='text-2xl font-bold mb-6 text-cyan-400'>

              Image Analysis Status

            </h2>

            {
              image ? (

                <div className='space-y-6'>

                  {/* IMAGE PREVIEW */}

                  <div className='bg-black/30 rounded-2xl overflow-hidden border border-cyan-500/20'>

                    <img
                      src={URL.createObjectURL(image)}
                      alt='uploaded'
                      className='w-full h-[300px] object-cover'
                    />

                  </div>

                  {/* RESULT */}

                  {
                    emotion && (

                      <div className='bg-black/30 rounded-2xl p-5 border border-cyan-500/10'>

                        <div className='flex justify-between items-center mb-4'>

                          <span className='text-gray-400'>

                            Detected Emotion

                          </span>

                          <span className='text-cyan-400 text-2xl font-bold'>

                            {emotion}

                          </span>

                        </div>

                        {/* CONFIDENCE */}

                        <div className='mb-3 flex justify-between'>

                          <span className='text-gray-400'>

                            Confidence

                          </span>

                          <span className='text-green-400 font-bold'>

                            {(confidence * 100).toFixed(1)}%

                          </span>

                        </div>

                        <div className='w-full bg-gray-700 h-4 rounded-full overflow-hidden'>

                          <div
                            className='h-4 bg-gradient-to-r from-cyan-400 to-green-400 transition-all duration-700'
                            style={{
                              width: `${confidence * 100}%`
                            }}
                          ></div>

                        </div>

                      </div>

                    )
                  }

                </div>

              ) : (

                <div className='h-[420px] flex items-center justify-center border-2 border-dashed border-cyan-500/20 rounded-2xl text-gray-500'>

                  No Image Uploaded

                </div>

              )
            }

          </div>

        </div>

      </div>

    </div>
  )
}