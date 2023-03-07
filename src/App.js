import './App.css';
import NavBar from './Components/NavBar';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<><NavBar /><Movies /></>} />
        <Route path='/movies' element={<><NavBar /><Movies /></>} />
        <Route path='/favourites' element={<><NavBar /><Favourites /></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
