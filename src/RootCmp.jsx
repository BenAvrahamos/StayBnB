import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './style/main.css'

import { StayIndex } from './views/StayIndex'
import { StayDetails } from './views/StayDetails'

export function RootCmp() {
  return <Provider>
    <Router>
      <Routes>
        <Route path='/' element={<StayIndex/>}/>
        <Route path='/:stayId' element={<StayDetails/>}/>
      </Routes>
    </Router>
  </Provider>

}
