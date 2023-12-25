import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './UserMenu.module.css';
import { logout } from '../../redux/auth/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ menuVisible, setMenuVisible ] = useState(false);
  const { displayName } = useSelector( state => state.auth.user );

  const handleLogout = () => {
    dispatch( logout() );
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuVisible( !menuVisible );
  };

  return (
    <div className={ styles.userMenu }>
      <span onClick={ toggleMenu }>{ displayName }</span>
      { menuVisible && (
        <div className={ styles.menuContent }>
          <button onClick={ handleLogout }>Salir</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
