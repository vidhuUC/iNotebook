import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <NoteState>
      <Router>
        <NavBar />
        <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
