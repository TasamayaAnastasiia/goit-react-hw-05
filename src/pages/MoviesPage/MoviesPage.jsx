import { useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { DataSearch } from "../../movies-api";
import {useSearchParams } from 'react-router-dom';
import css from '../MoviesPage/MoviesPage.module.css';
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [listResult, setListResult] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');

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
                if (resultSearching.length === 0) {
                    toast.error('We don`t have this movie');
                } else {
                    setListResult(resultSearching);
                }
            } catch (error) {
                console.error('Error occurred while searching:', error);
                toast.error('An error occurred while searching');
            }
        };
    
        if (query) {
            fetchSearch();
        }
    }, [query]);
    

    return (
        <div>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} type='text' name='query' placeholder="Searhing name..." onChange={handleInputChange} value={inputValue}></input>
                <button type='submit'>Search</button>
            </form>
            {listResult.length > 0 && query !== null && (<MovieList movies={listResult}/>)}
        </div>
    );
}
export default MoviesPage;