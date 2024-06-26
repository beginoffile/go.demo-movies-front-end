import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




const Genres = () =>{

    const [genres, setGetres] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        
        const getData = async () => {
            const headers = new Headers();
            headers.append("Content-Type","application/json");
            

            const requestOptions = {            
                method: "GET",
                headers: headers
            }        

            try{            
                let response = await fetch(`/genres`, requestOptions);            

                let data = await response.json()

                
                if (data.error){
                    setError(data.message)
                }else{
                    setGetres(data)              
                }
            
                
            }catch(err){
                if (err){
                    console.log(err);
                }
            }
        };
        getData();
    },[])

    if (error !== null){
        return <div>Error: {error.message}</div>
    }
    else{
        return(        
            <div>
                <h2>Genres </h2>               
                <hr/>
                {console.log(genres)}
                <div className="list-group">
                
                    {genres.map( (g)=> (
                        <Link
                            key={g.id}
                            className="list-group-item list-group-item-action"
                            to={`/genres/${g.id}`}
                            state={
                                {
                                    genreName: g.genere,
                                }
                            }
                        >{g.genre}</Link>
                        )
                    )}
                </div>
            </div>   
            

        )
    }


}

export default Genres;