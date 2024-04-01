import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Movie = () =>{
    const [movie, setMovie] = useState({});

    let {id} = useParams();

    useEffect(()=>{ async function fetchData(){
        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: headers
        }

        try{
            let response = await fetch(`/movies/${id}`, requestOptions);            

            let data = await response.json()

            setMovie(data)
        }catch(err){
            console.log(err);
        }

    } 
    fetchData();   
    },[id]);

    if (movie.genres){
        movie.genres = Object.values(movie.genres);
    }else{
        movie.genres = [];
    }

    return(        
        <div>
            <h2>Movie: {movie.title}</h2>
            <small><em>{movie.release_date}, {movie.runtime} minutes, Rated {movie.mpaa_rating}</em></small><br/>
            {movie.genres.map((g)=>
                 <span key={g.genres} className="badge bg-secondary me-2">{g.genre}</span>
            )}
            <hr/>
            {movie.image !== "" && 
                <div className="mb-3">
                    <img src={`http://image.tmdb.org/t/p/w200/${movie.image}`} alt="poster"></img>
                </div>
            }
            <p>{movie.description}</p>
           
        </div>        
    )

}

export default Movie;