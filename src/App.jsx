import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import Home from "./pages/Home";
import Search from "./pages/Search";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { faChalkboardUser, faList, faStar, faTicket } from "@fortawesome/free-solid-svg-icons";
import Movie from "./pages/Movie";

library.add(fab, faStar, faChalkboardUser, faList, faCalendarAlt, faClock, faTicket);

const App = () => {


  return (
    <Router>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/:id" element={<Movie />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
