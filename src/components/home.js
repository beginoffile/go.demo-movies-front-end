
import { Link } from 'react-router-dom'
import imgticket from './../Images/movie_tickets.jpg'

const Home = () =>{

    return(
        <>
        <div className="text-center">
            <h2>Find a movie to watch tonight!</h2>
            <hr/>
            <Link to="/movies">
                <img src={imgticket} alt="movie tickets"></img>
            </Link>
        </div>
        </>
    )

}

export default Home;