import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import "./Css/Home.css";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
	return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:imdbID" element={<Movie />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
