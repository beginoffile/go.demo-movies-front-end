import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";





const ManageCatalogue = () =>{

    const [movies, setMovies] = useState([]);
    const { jwtToken } = useOutletContext();
    const navigate = useNavigate();

   
    useEffect(() => {async function fetchData(){
console.log("TUCANAZO",jwtToken);
        if (jwtToken === ""){
            navigate("/login");
            return
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${jwtToken}`);
        
        
        const requestOptions = {
            method: "GET",
            headers: headers,
        }

        try{
            let response = await fetch(`/admin/movies`, requestOptions);
            
            let data = await response.json()

                     

            setMovies(data)
        }catch(err){
            console.log(err);
        }


    }    
    fetchData();
    },[jwtToken, navigate])
    

    return(        
        <div>
            <h2>Manage Catalogue </h2>
            <hr/>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Movie</th>
                        <th>Release Date</th>
                        <th>Rating</th>                        
                    </tr>
                </thead>
                <tbody>
                    {movies.map((m)=>(
                        <tr key={m.id}>
                            <td>
                                <Link to={`/admin/movie/${m.id}`}>{m.title}</Link>
                            </td>
                            <td>{m.release_date}</td>
                            <td>{m.mpaa_rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>        
    )

}

export default ManageCatalogue;