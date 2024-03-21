import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Alert from './components/alert';


function App() {
  
  
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("d-none");

  
  const[tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const logOut = async () =>{
    // setJwtToken("");
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    try{
      await fetch('/logout', requestOptions);
    }catch(e){
      console.log("error loggin out",e);
    } finally{
      setJwtToken("");
      toggleRefresh(false);
      
    }

    navigate("/login");
  }

  const toggleRefresh = useCallback( (status) => {
    console.log("clicked");

    if (status){
      console.log("turning on ticking")
      let i = setInterval(async ()=>{
        console.log("this will run every second");
        
        const requestOptions = {
          method: "GET",
          credentials: "include",        
        }

        try{        
          let response = await fetch('/refresh', requestOptions)
          let data = await response.json();
          console.log(data)
          if (data.access_token){
            setJwtToken(data.access_token);            
          }
        }
        catch(e){
          console.log('user is not logged in');
        }
      },600000);

      setTickInterval(i)

      console.log("setting tick interval interval to", i)

    }else{

      console.log("turning off ticking")
      console.log("turning off tickInterval",tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
      
    }
  },[tickInterval])

  

  useEffect(()=>
  {
    async function fetchData(){
      if (jwtToken === "") {
        const requestOptions = {
          method: "GET",
          credentials: "include",        
        }

        try{        
          let response = await fetch('/refresh', requestOptions)
          let data = await response.json();
          console.log(data)
          if (data.access_token){
            setJwtToken(data.access_token)
            toggleRefresh(true);
          }
        }
        catch(e){
          console.log('user is not logged in');
        }
      }
    }
    fetchData()
  },[jwtToken, toggleRefresh]
  )

  

  return (    
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken===""
          ? <Link to="/login"><span className="badge bg-success">Login</span></Link>
          : <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>
          }
        </div>        
        <hr className="mb-3"/>
      </div>  

          
      
      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>
              <Link to="/movies" className="list-group-item list-group-item-action">Movies</Link>
              <Link to="/genres" className="list-group-item list-group-item-action">Gen res</Link>
              {jwtToken !== "" &&  
                <>
                  <Link to="/admin/movie/0" className="list-group-item list-group-item-action">Add Movie</Link>
                  <Link to="/manage-catalogue" className="list-group-item list-group-item-action">Manage Catalog</Link>
                  <Link to="/graphql" className="list-group-item list-group-item-action">GraphQL</Link>
                </>
              }
            </div>
          </nav>
        </div>

        <div className="col-md-10">
          <Alert
           message ={alertMessage}
           className={alertClassName}
          />
          <Outlet context={{
            jwtToken, setJwtToken,
            setAlertClassName,
            setAlertMessage,
            toggleRefresh,
          }}/>
        </div>

      </div>
    </div>
  );
}

export default App;
