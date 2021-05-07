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
        <div className="navbar navbar-dark bg-secondary">
            <Link className="navbar-brand mx-3" to="/">APP POKE</Link>
            <div className="d-flex">
               {
                   Usuario == null?
                   (<NavLink className="btn btn-dark mx-1" to="/login" exact>Login</NavLink>
                    ):
                    (<>
                        <button className="btn btn-dark mx-2" onClick={()=>cerrarSession()}>Cerrar Session</button>
                        <NavLink className="btn btn-dark mx-2" to="/" exact>Inicio</NavLink>
                    </>)
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar)
