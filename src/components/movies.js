import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () =>{

    const [movies, setMovies] = useState([]);

    // useEffect(() =>{
    //     let movieList = [
    //         {
    //             id: 1,
    //             title: "Hightlander",
    //             release_date: '1986-03-07',
    //             runtime: 116,
    //             mpaa_rating: "R",
    //             description: "Some Long description",
    //         },
    //         {
    //             id: 2,
    //             title: "Raiders of the lost Ark",
    //             release_date: '1981-06-12',
    //             runtime: 115,
    //             mpaa_rating: "PG-13",
    //             description: "Some Long description",
    //         },
    //     ];
    //     setMovies(movieList);
    // },[])

    useEffect(() => {
        
        const fetchData= async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        
        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        try{
            let response = await fetch(`/movies`, requestOptions);
            
            let data = await response.json()   
            
            if (data){
                setMovies(data)
            }

        }catch(err){
            console.log(err);
        }


    };
     fetchData();
    },[])

    
    return(        
        
        <div>
            <h2>Movies </h2>
            <hr/>
            {movies ? (<table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>                        
                    </tr>
                </thead>
                <tbody>
                    {console.log(movies)}
                    {movies.map((m)=>(
                        <tr key={m.id}>
                            <td>
                                <Link to={`/movies/${m.id}`}>{m.title}</Link>
                            </td>
                            <td>{m.release_date}</td>
                            <td>{m.mpaa_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           ) :
                ( <p>No movies yet!!</p>)
            }
            
        </div>        
    )

}

export default Movies;