import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PokemonList from './pages/pokemons/PokemonList/PokemonList';
import PokemonDetail from './pages/pokemons/PokemonDetail/PokemonDetail';
import PokemonEdit from './pages/pokemons/PokemonEdit/PokemonEdit';
import PokemonsByUser from './pages/pokemons/PokemonsByUser/PokemonsByUser';
import LoginPage from './pages/auth/LoginPage/LoginPage';
import RegisterPage from './pages/auth/RegisterPage/RegisterPage';
import PokemonDetailByUser from './pages/pokemons/PokemonDetailByUser/PokemonDetailByUser';


function App() {
  const { user } = useSelector( state => state.auth );

  return (
    <BrowserRouter>
      <Routes>
        { user &&
          <>
            <Route path="/" element={ <PokemonList /> } />
            <Route path="/pokemon/:name" element={ <PokemonDetail /> } />
            <Route path='/pokemon/updateInfo/:name' element={ <PokemonEdit />} />
            <Route path="/*" element={ <PokemonList /> } />
            <Route path='/myPokemons' element={ <PokemonsByUser /> } />
            <Route path="/my_pokemons/:index" element={ <PokemonDetailByUser /> } />
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
