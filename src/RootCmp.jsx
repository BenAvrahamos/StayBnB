import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect, useState } from 'react'

import './style/main.css'

import { StayIndex } from './pages/StayIndex'
import { StayDetails } from './pages/StayDetails'
import { AppHeader } from './cmps/HeaderCmps/AppHeader'
import { StayPayment } from './pages/StayPayment'
import { UserTrips } from './pages/UserTrips'
import { AppFooter } from './cmps/AppFooter'

export function RootCmp() {

  const [dynamicPageLayOut, SetDynamicPageLayOut] = useState({
    header: { compact: false, fixed:   false },
    fixedFilterLabel: false,
    listMargin: false
  })


  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const newLayout = {
        header: { compact: offset > 0, fixed: offset > 0 },
        fixedFilterLabel: offset > 0,
        listMargin: offset > 0
      };

      // Check if the new layout is different from the current layout
      if (
        newLayout.header.compact !== dynamicPageLayOut.header.compact ||
        newLayout.header.fixed !== dynamicPageLayOut.header.fixed ||
        newLayout.fixedFilterLabel !== dynamicPageLayOut.fixedFilterLabel ||
        newLayout.listMargin !== dynamicPageLayOut.listMargin
      ) {
        SetDynamicPageLayOut(newLayout);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dynamicPageLayOut]); // Add dynamicPageLayOut as a dependency to ensure the latest state is used for comparison



  return (
    <Provider store={store}>
      <Router>
        <AppHeader dynamicPageLayOut={dynamicPageLayOut} SetDynamicPageLayOut={SetDynamicPageLayOut} />

        <Routes>
          <Route path='/' element={<StayIndex />} />
          <Route path='/:stayId' element={<StayDetails />} />
          <Route path='/:stayId/payment' element={<StayPayment />} />
          <Route path='/trips' element={<UserTrips />} />
        </Routes>
        <AppFooter/>
      </Router>
    </Provider>
  )
}
