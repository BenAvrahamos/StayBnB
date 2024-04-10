import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'

import './style/main.css'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/HeaderCmps/AppHeader'
import { StayReservation } from './pages/StayReservation'

export function RootCmp() {

  const [isFixed, setIsFixed] = useState(false);



  useEffect(() => {
      const handleScroll = () => {
          const offset = window.scrollY
          if (offset > 0) {
              setIsFixed(true)
          } else {
              setIsFixed(false)
          }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll)
      }
  }, [])


  return (
<Provider store={store}>
  <Router>
    <AppHeader isFixed={isFixed}/>

    <Routes>
      <Route path='/' element={<StayIndex isFixed={isFixed} />} />
      <Route path='/:stayId' element={<StayDetails />} />
      <Route path='/:stayId/payment' element={<StayReservation /> } />
    </Routes>
  </Router>
  </Provider>
  )
}
