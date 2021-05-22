import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link , NavLink} from 'react-router-dom'
import {closeSession} from '../redux/userDucks'
import{withRouter} from 'react-router-dom'
const Navbar = (props) => {
    
    const dispatch = useDispatch()
    const {Usuario} = useSelector(store => store.usuario)
    
    const cerrarSession =()=>{
       dispatch(closeSession())
       props.history.push('/login')
       
    }
    return (
        <div className="navbar navbar-dark bg-secondary px-2">
          <div>
                <Link className="navbar-brand mx-3" to="/">APP POKE</Link>
          </div>
          
            <div className="d-flex flex-direction-row"> 
                    <div className="d-flex align-items-center">
                        {
                        Usuario == null?
                        (<NavLink className="btn btn-dark mx-3" to="/login" exact>Login</NavLink>
                            ):
                            (<div className="d-flex flex-direction-row">
                                <NavLink className="btn btn-dark btn-sm mx-1" to="/listado" exact>Pokemones...!!</NavLink>
                                <NavLink className="btn btn-dark btn-sm mx-1" to="/perfil" exact>Perfil</NavLink>
                                <NavLink className="btn btn-dark btn-sm mx-1" to="/" exact>Inicio</NavLink>
                                <button className="btn btn-dark mx-1 btn-sm" onClick={()=>cerrarSession()}>Cerrar Session</button>
                            </div>)
                        }
                
                    </div> 
                    
            </div>
        </div>
       
    )
}

export default withRouter(Navbar)
