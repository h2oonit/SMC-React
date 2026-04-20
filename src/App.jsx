import { BrowserRouter as Router, Route, Routes, useNavigate,} from 'react-router-dom';
import "./Css/Home.css";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState();
  const [entered, setEntered] = useState(false);

	return (
    <Router>
      <div className="App">
        <Navbar setSearchValue={setSearchValue} setEntered={setEntered}/>
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue}/>} />
          <Route path="/movie/:imdbID" element={<Movie searchValue={searchValue} entered={entered} setEntered={setEntered}/>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
