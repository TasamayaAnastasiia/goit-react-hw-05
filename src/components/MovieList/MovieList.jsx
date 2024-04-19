import { NavLink, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';
import clsx from 'clsx';

export default function MovieList({movies}) {

const location = useLocation();

const classForLinks = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

    return (
        <ul className={css.listMovies}>
            {movies.map(movie => 
            <li key={movie.id}>
                <NavLink className={classForLinks} to={`/movies/${movie.id}`} state={location}>
                    <img src={'https://image.tmdb.org/t/p/w500'+`${movie.backdrop_path}`}/>
                    <p className={css.paragraf}><b>{movie.original_title}</b></p>
                </NavLink>
            </li>)}
        </ul>
    );
}