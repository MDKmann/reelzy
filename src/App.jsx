import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Search from "./pages/Search"
import Home from "./pages/Home"
import Nav from "./components/Nav"

const App = () => {


  return (
    <Router>
      <>
      <Nav />
      <h1 className="text-3xl font-bold underline">
      Hello world!
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="" element={<Search />} ></Route>
      </Routes>
    </h1>
    </>
    </Router>
  )
}

export default App
