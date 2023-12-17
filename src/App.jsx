import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PokemonList from './pages/PokemonList/PokemonList';
import PokemonDetail from './pages/PokemonDetail/PokemonDetail';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  const { user } = useSelector( state => state.auth );

  return (
    <BrowserRouter>
      <Routes>
        { user &&
          <>
            <Route path="/" element={ <PokemonList /> } />
            <Route path="/pokemon/:name" element={ <PokemonDetail /> } />
            {/* HACER UNA PAGINA NOT FOUND */}
            <Route path="/*" element={ <PokemonList /> } />
          </>
        }
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/*" element={ <LoginPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
