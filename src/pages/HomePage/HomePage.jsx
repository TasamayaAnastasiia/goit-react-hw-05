import MovieList from '../../components/MovieList/MovieList';
import {Data} from '../../movies-api.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import css from '../HomePage/HomePage.module.css';


function HomePage() {
    const [listMovies, setListMovies] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
              try {
                  const movies = await Data();
                  setListMovies(movies);
  
              } catch {
                  toast.error('Error fetching data')
              }
          }
          fetchData();
      }, []);

    return (
        <div>
            <Toaster/>
            <h1 className={css.title}>Trending today</h1>
            <MovieList movies={listMovies}/>
        </div>
    );
}
export default HomePage;