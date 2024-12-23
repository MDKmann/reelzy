import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from "./pages/Search"
import Home from "./pages/Home"
import Nav from "./components/Nav"

const App = () => {


  return (
    <Router>
      <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="" element={<Search />} ></Route>
      </Routes>
    </>
    </Router>
  )
}

export default App
