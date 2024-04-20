import { Link, useParams, useLocation, NavLink, Outlet } from 'react-router-dom';
import { getData } from '../../movies-api';
import { useEffect, useState, Suspense, useRef } from 'react';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import { Audio } from 'react-loader-spinner';
import clsx from 'clsx';

const MovieDetailsPage = () => {

const {movieId} = useParams();
const [movie, setMovie] = useState(null);
const location = useLocation();
const backLinkHref = useRef(location.state ?? '/movies');

const classForLinks = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movieData = await getData(movieId);
                    setMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        fetchMovie();
    }, [movieId]);

    return (
        movie !== null && (
        <>
            <Link className={css.goBack} to={backLinkHref.current}><button>Go back</button></Link>
            <div className={css.content}>
                <img src={'https://image.tmdb.org/t/p/w500'+`${movie.backdrop_path}`}></img>
                <div>
                    <p style={{fontWeight: 900, fontSize: 30}}>{movie.title}</p>
                    <p><b>User score:</b> {movie.vote_average*10}%</p>
                    <p><b>Overview:</b> {movie.overview}</p>
                    <p><b>Date release:</b> {movie.release_date}</p>
                </div>
            </div>
            <div className={css.listOcen}>Adittional information
                <NavLink className={classForLinks} to='reviews'>Reviews</NavLink>
                <NavLink className={classForLinks} to='cast'>Cast</NavLink>
            </div>

            <Suspense 
            fallback={<div className='container'><Audio height="50" width="30" radius="3" color="#1f7319" ariaLabel="three-dots-loading" wrapperStyle wrapperClass /></div>}>
                <Outlet />
            </Suspense>

        </>
        )
    );
}
export default MovieDetailsPage;