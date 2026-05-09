import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import History from './pages/History'

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path='/'
          element={<Dashboard />}
        />

        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/signup'
          element={<Signup />}
        />

        <Route
          path='/history'
          element={<History />}
        />

      </Routes>

    </BrowserRouter>

  )
}