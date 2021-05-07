import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ingresoUsuario} from '../redux/userDucks'
import {withRouter} from 'react-router-dom'
//
const Login = (props) => {
    const dispatch = useDispatch()
    const usuario = useSelector(store => store.usuario.Usuario)      
    const {loading} = useSelector(store => store.usuario)
    const {activo} = useSelector(store => store.usuario)
    const {Message} = useSelector(store=>store.usuario)

    
        useEffect(() => {
       const redireccionar =()=>{
        console.log(activo)   
        if(activo){
            props.history.push('/')
           }
           return
       }
        redireccionar()
    }, [activo])
    return (
        <div className="container mt-5 text-center">
            <h3>Ingreso con Google</h3>
            <hr className="text-primary mt-5"/>
           
           {
               loading &&
               <div className="d-flex justify-content-center">
                   <p className="alert alert-success w-50">Ingresando con una cuenta google</p>
                </div>
            }
            {
                Message &&
                <div className="d-flex justify-content-center">
                   <p className="alert alert-danger w-50">{Message.message}</p>
                </div>
            }
            {
                <button className="btn btn-primary btn-sm" onClick={()=>dispatch(ingresoUsuario())}
                    disabled={loading}
                >Acceder </button>
            }
            
        </div>
    )
}

export default withRouter(Login)
