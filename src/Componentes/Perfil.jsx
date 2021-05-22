import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateUser , updateImage} from '../redux/userDucks'

const Perfil = () => {
    const dispatch = useDispatch()
    const {Usuario} = useSelector(store => store.usuario)
    const {loading} = useSelector(store => store.usuario)
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState(Usuario.displayName)
    const [error, setError] = useState({alert:false, message:''})
    // useEffect(() => {
    //     const fetchData =()=>{

    //     }
    //     fetchData()
    // }, [])
    const saveEdit =()=>{
        if(!user.trim()){
            alert('no ingreso el nombre para editar')
            return
        }
        dispatch(updateUser(user))
        setEdit(false)
    }
    const seleccionarArchivo= img =>{
           const imgCliente = img.target.files[0]
        if (imgCliente === undefined) {
            setError({
                alert:true,
                message:'No selecciono una imagen'
            })
            return
        }
        if (imgCliente.type === 'image/png' || imgCliente.type === 'image/jpeg') {
           if (imgCliente.size > 28000) {   //permite imagenes menores de 28mil bits
               setError({
                    alert:true,
                    message:'El tamaño de la imagen es mayor al permitido'
                })
                return
            }
            dispatch(updateImage(imgCliente))                 
                setError({
                    alert:false,
                    message:''
                })
                
        }else{
            setError({
                alert:true,
                message:'El formato de la imagen debe ser PNG o JPEG/JPG'
            })
        }
    }
    
    return Usuario !==null ?(
        
        <div className="mt-5 text-center">
            <div className="card bg-transparent">
            {
                loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary my-5" role="status">
                            <span className="visually-hidden w-3rem">Loading...</span>
                        </div>
                    </div>
                ):(
                    <div className="card-body">
                    
                    <img src={Usuario.photoURL}className="rounded mx-auto d-block shadow-lg p-1 mb-5 bg-body rounded"></img>

                    <div className="d-flex justify-content-center text-center">    
                        <div className="mb-2 flex-column w-50">
                            <label htmlFor="formFileSm" 
                            className="form-label">
                                <i className='bx bx-camera mt-1 text-info'
                                    id="cam"></i>
                            </label>
                            <div className="d-flex justify-content-center row-1">
                                {
                                    error.alert &&
                                    <div className="alert alert-success">
                                        <span className="text-success span">
                                            {error.message}</span>
                                    </div>
                                }
                                
                                <input className="form-control"
                                        id="formFileSm"
                                        type="file"
                                        onChange={e => seleccionarArchivo(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <h5 className="card-title text-white">Nombre: {Usuario.displayName}</h5> 
                    <p className=" card-text text-secondary">correo electronico: {Usuario.email}</p>
                    {
                        edit&&
                    <div className="d-flex justify-content-center mb-2">
                        <input
                            className='form-control w-50'
                            placeholder="Ingrese el nombre nuevo"
                            onChange={(e)=> setUser(e.target.value)}
                             value={user}
                        />
                    </div>
                    }
                    <button className=
                    {
                        !edit?("btn btn-outline-info"):("btn btn-outline-primary btn-sm")
                    }
                    
                     onClick={
                            !edit ?
                            ()=>setEdit(true):()=>saveEdit()
                        
                        }
                    >{edit?('Guardar'):('Editar datos')}</button>  
                </div>
                )
            }
            
            </div>
        </div>
    ):<p>Cargando perfil de usuario</p>
}

export default Perfil
