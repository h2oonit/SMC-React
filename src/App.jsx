import { BrowserRouter as Router, Route, Routes, useNavigate,} from 'react-router-dom';
import "./Css/Home.css";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState();

	return (
    <Router>
      <div className="App">
        <Navbar setSearchValue={setSearchValue}/>
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue}/>} />
          <Route path="/movie/:imdbID" element={<Movie />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
