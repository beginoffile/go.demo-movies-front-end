import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Input from "./forms/input";
import Select from './forms/select';
import TextArea from './forms/textarea';
import Checkbox from './forms/checkbox';
import Swal from "sweetalert2";

const EditMovie = () =>{
    const navigate = useNavigate();
    const {jwtToken} = useOutletContext();

    const [error, setError] = useState(null)
    const [errors, setErrors] = useState([])

    const mpaaOptions = [
        {id: "G", value:"G"},
        {id: "PG", value:"PG"},
        {id: "PG13", value:"PG13"},
        {id: "R", value:"R"},
        {id: "NC17", value:"NC17"},
        {id: "18A", value:"18A"},
    ]

    const hasError = (key) =>{
        return errors.indexOf(key) !== -1
    }

    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        release_date: "",
        runtime: "",
        mpaa_rating: "",
        description: "",       
        genres: [],
        genres_array: [Array(13).fill(false)],
    })

    //get id from URL
    let {id} = useParams();

    if (id === undefined){
        id = 0;
    }

    useEffect(() => { async function fetchData(){
        if (jwtToken === ""){
            navigate("/login")
            return;
        }

        if (id===0){
            //adding a movie
            setMovie({
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                description: "",       
                genres: [],
                genres_array: [Array(13).fill(false)],

            })
            const headers = new Headers();

            headers.append("Content-Type", "application/json");

            const requestOptions = {
                method: "GET",
                headers: headers
            }
    
            try{
                let response = await fetch(`/genres`, requestOptions);            
    
                let data = await response.json()
    
                const checks = [];
                data.forEach(element => {
                    checks.push({id: element.ID, checked: false, genre: element.genre});
                });
                setMovie( m=>({
                    ...m,
                    genres: checks,
                    genres_array: [],
                }))
            }catch(err){
                console.log(err);
            }
            
        }
        else{
            //editing an existing movie
        }

    }
    fetchData();
    },[id, jwtToken, navigate])


    const handleSubmit = (e)=>{
        e.preventDefault();

        let errors = [];
        let required = [
            {field: movie.title, name: "title"},
            {field: movie.release_date, name: "release_date"},
            {field: movie.runtime, name: "runtime"},
            {field: movie.description, name: "description"},
            {field: movie.mpaa_rating, name: "mpaa_rating"},
        ]

        required.forEach( obj =>{
            if (obj.field === ""){
                errors.push(obj.name);
            }
        });

        if (movie.genres_array.length===0){
            // alert("You must chooseat at least one genre!");
            Swal.fire({
                title: "Error!",
                text: "You must choose at least one genre!",
                icon: 'error',
                confirmButtonText: 'OK',

            });
            errors.push("genres");
        }

        setErrors(errors);

        if (errors.length > 0){
            return false;
        }

    }

    const handleChange = () => (e) =>{
        let value = e.target.value;
        let name = e.target.name;
        setMovie({
            ...movie,
            [name]: value,
        });
    }

    const handleCheck = (e, position) => {
        console.log("handleCheck called");
        console.log("value in the handleCheck:", e.target.value);
        console.log("checked is", e.target.checked);
        console.log("position is ", position);

        let tmpArr = movie.genres;
        tmpArr[position].checked = !tmpArr[position].checked;

        let tmpIDs = movie.genres_array;

        if (!e.target.checked){
            let element = parseInt(e.target.value,10)          
            tmpIDs.splice(tmpIDs.indexOf(element),1);          
        }else{
            tmpIDs.push(parseInt(e.target.value, 10));
        }

        setMovie({
            ...movie,
            genres_array: tmpIDs,
        })
    }

    

    return(        
        <div>
            <h2> Add/Edit Movie</h2>
            <hr/>
            {/* <pre>{JSON.stringify(movie, null, 3)}</pre> */}
            
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="id" value={movie.id} id="id"></input>

                <Input
                    title={"Title"}
                    className={"form-control"}
                    type={"text"}
                    name={"title"}
                    value={movie.title}
                    onChange={handleChange("title")}
                    errorDiv={hasError("title") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a title"}
                />

                <Input
                    title={"Release Date"}
                    className={"form-control"}
                    type={"date"}
                    name={"release_date"}
                    value={movie.release_date}
                    onChange={handleChange("release_date")}
                    errorDiv={hasError("release_date") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a Release Date"}
                />

                <Input
                    title={"Runtime"}
                    className={"form-control"}
                    type={"text"}
                    name={"runtime"}
                    value={movie.runtime}
                    onChange={handleChange("runtime")}
                    errorDiv={hasError("runtime") ? "text-danger" : "d-none"}
                    errorMsg={"Please enter a runtime"}
                />

                <Select
                    title={"MPAA Rating"}
                    name={"mpaa_rating"}
                    options={mpaaOptions}
                    onChange={handleChange("mpaa_rating")}
                    placeHolder={"Choose..."}
                    errorMsg={"Please choose"}
                    errorDiv={hasError("mpaa_rating") ? "text-danger" : "d-none" }
                />

                <TextArea
                    title="Description"
                    name={"Description"}
                    value={movie.description}
                    rows={"3"}
                    onChange={handleChange("description")}
                    errorMsg={"Enter a description"}
                    errorDiv={hasError("description") ? "text-danger" : "d-none" }
                />
                <hr/>
                <h3>Genres</h3>

                {movie.genres && movie.genres.length > 1 && 
                <>
                    {Array.from(movie.genres).map((g, index) =>
                        <Checkbox
                            title={g.genre}
                            name= {"genre"}
                            key={index}
                            id={"genre-" + index}
                            onChange={(e)=> handleCheck(e, index)}
                            value={g.id}
                            checked={movie.genres[index].checked}
                        ></Checkbox>
                    )
                    }                
                </>
                
                
                }
                <hr/>
                <button className="btn btn-primary">Save</button>

            </form>
           
        </div>        
    )

}

export default EditMovie;