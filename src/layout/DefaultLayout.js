import React from 'react'
import { AppContent, AppSidebar, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body ">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
