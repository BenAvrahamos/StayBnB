import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style/main.css'

import { StayIndex } from './views/StayIndex'
import { StayDetails } from './views/StayDetails'
import { AppHeader } from './views/AppHeader'

export function RootCmp() {
  return <Router>
    <AppHeader/>

    <Routes>
      <Route path='/' element={<StayIndex />} />
      <Route path='/:stayId' element={<StayDetails />} />
    </Routes>
  </Router>
}
