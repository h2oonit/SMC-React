import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./Css/Home.css";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Navbar from './Components/Navbar';

function App() {
	return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
