import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Context } from './index'
import AppRouter from './components/AppRouter'
import BrandBar from './components/BrandBar'

const App = observer(() => {
  const { user } = useContext(Context)

  window.addEventListener('resize', function (event) {
    user.setUserWidth(document.body.clientWidth)
    user.setUserHeight(document.body.clientHeight)
  })

  return (
      <BrowserRouter>
        <BrandBar />
        <main style={{ minHeight: '100vh' }}>
          <AppRouter />
        </main>
      </BrowserRouter>
  )
})

export default App
