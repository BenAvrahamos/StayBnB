import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

import './style/main.css'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/HeaderCmps/AppHeader'
import { StayReservation } from './pages/StayReservation'

export function RootCmp() {
  return (
<Provider store={store}>
  <Router>
    <AppHeader/>

    <Routes>
      <Route path='/' element={<StayIndex />} />
      <Route path='/:stayId' element={<StayDetails />} />
      <Route path='/:stayId/payment' element={<StayReservation /> } />
    </Routes>
  </Router>
  </Provider>
  )
}
