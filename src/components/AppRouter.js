import React from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from '../routes'
import { SHOP_ROUTE } from '../utils/routeConsts'

const AppRouter = observer(() => {
  return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
  )
})

export default AppRouter
