import { useEffect, useState } from "react";
import { DataCast } from "../../movies-api";
import { useParams } from "react-router-dom";
import css from '../MovieCast/MovieCast.module.css';


const MovieCast = () => {
const [casts, setCasts] = useState([]);
const {movieid} = useParams();

 useEffect(() => {
    const fetchCasts = async () => {
        try {
            const castesMovie = await DataCast(movieid);
            setCasts(castesMovie);
        } catch {
            alert('error downloading actors in this movie');
        }
    }
    fetchCasts();
 },[movieid]);

    return (
        <ul className={css.listCast}>
           {casts.length !== 0 ? (casts.map(cast => <li key={cast.id}>
                <img src={`https://image.tmdb.org/t/p/w500`+`${cast.profile_path}`}></img>
                <p><b>{cast.name}</b></p>
                <p><i>{cast.character}</i></p>
            </li>)) : <p>We don't have any reviews for this movie</p>}
        </ul>
    );
}
export default MovieCast;