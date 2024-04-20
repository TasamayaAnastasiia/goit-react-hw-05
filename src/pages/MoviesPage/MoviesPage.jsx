import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { DataSearch } from "../../movies-api";
import { useLocation, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import css from '../MoviesPage/MoviesPage.module.css';
import clsx from 'clsx';

const MoviesPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [listResult, setListResult] = useState([]);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

    const classForLinks = ({ isActive }) => {
        return clsx(css.link, isActive && css.active);
      };

    const handleSubmit = (e) => {

        e.preventDefault();
        const value = e.target.elements.query.value;

        if (!value) {
            toast.error('Your field is empty');
            return;
        } 

        setSearchParams({ query: value });                         //нове значення query
        setInputValue(value);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    useEffect(() => {                                               
        const fetchSearch = async () => {
            try {
                const resultSearching = await DataSearch(query);
                setListResult(resultSearching);
            } catch {
                toast.error('We are don`t have this movie');
            }
        }
        fetchSearch();
     }, [query]);

     

    return (
        <div>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} type='text' name='query' placeholder="Searhing name..." onChange={handleInputChange} value={inputValue}></input>
                <button type='submit'>Search</button>
            </form>
            {listResult !== 0 && query !== null && (
                <ul className={css.listSearching}>
                    {listResult.map(movie => 
                        <NavLink className={classForLinks} key={movie.id} to={`${movie.id}`} state={location}>
                            <li>
                                <img src={'https://image.tmdb.org/t/p/w500'+`${movie.backdrop_path}`}/>
                                <p className={css.paragraf}><b>{movie.title}</b></p>
                            </li>
                        </NavLink>)
                    }
                </ul>
            )}
        </div>
    );
}
export default MoviesPage;