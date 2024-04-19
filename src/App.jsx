import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx';
import {Navigation} from './components/Navigation/Navigation.jsx';
import { Toaster, toast } from 'react-hot-toast';
import { Audio } from 'react-loader-spinner';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage.jsx'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage.jsx'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews.jsx'));

function App() {

  return (
    <div>
      <Toaster/>
      <Navigation/>
      <Suspense fallback={<div className='container'><Audio height="50" width="30" radius="3" color="#1f7319" ariaLabel="three-dots-loading" wrapperStyle wrapperClass /></div>}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/movies' element={<MoviesPage/>}/>
          <Route path='/movies/:movieid' element={<MovieDetailsPage/>}>
            <Route path='cast' element={<MovieCast/>}/>
            <Route path='reviews' element={<MovieReviews/>}/>
          </Route>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;
