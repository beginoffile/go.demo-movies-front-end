import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './components/errorpage';
import Home from './components/home';
import Movies from './components/movies';
import Genres from './components/genres';
import EditMovie from './components/editmovie';
import ManageCatalogue from './components/manage-catalogue';
import GraphQL from './components/graphql';
import Login from './components/login';
import App from './App';
import Movie from './components/movie';
import OneGenre from './components/onegenre';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {
        path: "/movies",
        element: <Movies/>,
      },
      {
        path: "/movies/:id",
        element: <Movie/>,
      },
      {
        path: "/genres",
        element: <Genres/>,
      },
      {
        path: "/genres/:id",
        element: <OneGenre/>,
      },
      {
        path: "/admin/movie/0",
        element: <EditMovie/>,
      },
      {
        path: "/admin/movie/:id",
        element: <EditMovie/>,
      },
      {
        path: "/manage-catalogue",
        element: <ManageCatalogue/>,
      },
      {
        path: "/graphql",
        element: <GraphQL/>,
      },
      {
        path: "/login",
        element: <Login/>,
      }

    ]
  }
]);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

