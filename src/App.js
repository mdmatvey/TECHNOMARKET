import { observer } from 'mobx-react-lite'
import React, { useState, useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter, Link } from 'react-router-dom'
import { Context } from './index'
import AppRouter from './components/AppRouter'
import { check } from './components/http/userAPI'
import BrandBar from './components/BrandBar'

const App = observer(() => {
  const { user, breadcrumbs } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // check().then(data => {

    (async function asyncFunc () {
      const response = await check()

      if (response) {
        setLoading(false)
      } else {
        setLoading(false)
      }
    })()

    // }).finally(() => setLoading(false))
  }, [])

  window.addEventListener('resize', function (event) {
    user.setUserWidth(document.body.clientWidth)
    user.setUserHeight(document.body.clientHeight)
  })

  if (loading) {
    return (
      <div
          style={{ height: '100vh' }}
          className="d-flex align-items-center justify-content-center"
        >
        <Spinner
          animation="border"
          variant="secondary" />
      </div>
    )
  }

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
