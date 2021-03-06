import React, { useEffect, useState } from 'react'
import Pokemons from './Componentes/Pokemons'
import {BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom"
import Login from './Componentes/Login';
import Navbar from './Componentes/Navbar';
import {auth,firebase} from './firebase'

const App =()=> {
  const [firebaseUser, setFirebaseUser] = useState(false)
  
  useEffect(() => {
   const fetchUser =()=>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setFirebaseUser(user)
        }else{
          setFirebaseUser(null)
        }
      })
   }
   fetchUser()
    
  }, [])
   const PrivateRoute =({component, path, ...rest})=>{
      if(localStorage.getItem('usuario')){
          const userLocal = JSON.parse(localStorage.getItem('usuario'))
          if(userLocal.uid === firebaseUser.uid){
           return <Route component={component} path={path} {...rest}></Route>
          }else{
            return <Redirect to="/login" {...rest}/>
          }
      }else{
        return <Redirect to="/login" {...rest}/>
      }
   }
 return firebaseUser !== false? (
    <Router>
      <div className="App">
       <Navbar></Navbar>
       <Switch>
         <PrivateRoute component={Pokemons}  path="/"exact={true}/>
         <Route component={Login} exact path="/login"/>
        
          
         
       </Switch>
      </div>
    </Router>
  ):(<div>Cargando...</div>)
}

export default App
