import { Page404 } from "common/components"
import { HashRouter, Routes, Route } from "react-router-dom"
import { App } from "../../app/App"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"

export const Path = {
  Login: "login",
} as const

export const Router = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  </HashRouter>
)
