import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={ styles.navbar }>
            <Link className={ styles.navbarItem } to="/">Pokemons de API</Link>
            <Link className={ styles.navbarItem } to="/myPokemons">Mis Pokemones</Link>
        </nav>
    );
};

export default NavBar;
