import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from "./pages/Search"
import Home from "./pages/Home"
import Nav from "./components/Nav"
import Footer from "./components/Footer"

const App = () => {


  return (
    <Router>
      <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/search" element={<Search />} ></Route>
      </Routes>
      <Footer />
    </>
    </Router>
  )
}

export default App
