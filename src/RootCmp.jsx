import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'

import './style/main.css'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/HeaderCmps/AppHeader'
import { StayPayment } from './pages/StayPayment'
import { OrderList } from './pages/OrderList'

export function RootCmp() {

  const [dynamicPageLayOut, SetDynamicPageLayOut] = useState({
    header: { compact: false, fixed:   false },
    fixedFilterLabel: false,
    listMargin: false
  })

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const offset = window.scrollY
  //     if (offset > 0) {
  //       SetDynamicPageLayOut({
  //         header: { compact: true, fixed: true },
  //         fixedFilterLabel: true,
  //         listMargin: true
  //       })
  //     } else {
  //       SetDynamicPageLayOut({
  //         header: { compact: false, fixed: false },
  //         fixedFilterLabel: false,
  //         listMargin: false
  //       })
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [])


  return (
    <Provider store={store}>
      <Router>
        <AppHeader dynamicPageLayOut={dynamicPageLayOut} SetDynamicPageLayOut={SetDynamicPageLayOut} />

        <Routes>
          <Route path='/' element={<StayIndex dynamicPageLayOut={dynamicPageLayOut} />} />
          <Route path='/:stayId' element={<StayDetails />} />
          <Route path='/:stayId/payment' element={<StayPayment />} />
          <Route path='/order' element={<OrderList />} />
        </Routes>
      </Router>
    </Provider>
  )
}
