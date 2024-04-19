import { useEffect, useState } from "react";
import { DataReviews } from "../../movies-api";
import { useParams } from "react-router-dom";


const MovieReviews = () => {
const [reviews, setReviews] = useState([]);
const {movieid} = useParams();

 useEffect(() => {
    const fetchReviews = async () => {
        try {
            const rev = await DataReviews(movieid);
            setReviews(rev);
        } catch {
            alert('error downloading reviews in this movie');
        }
    }
    fetchReviews();
 },[movieid]);

    return (
        <ul>
           {reviews.length !== 0 ? (reviews.map(review => <li key={review.id}>
                <p><b>{review.author}</b></p>
                <p><i>{review.content}</i></p>
            </li>)) : <p>We don't have any reviews for this movie</p>}
        </ul>
    );
}
export default MovieReviews;