import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css';
import clsx from 'clsx';

const classForLinks = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

export const Navigation = () => {
    return (
        <header className={css.header}> 
            <nav className={css.container}>
                <NavLink  className={classForLinks} to='/' >Home</NavLink>
                <NavLink className={classForLinks} to='/movies'>Movies</NavLink>
            </nav>
        </header>
    );
};