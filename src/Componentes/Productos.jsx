import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {dispatch , useSelector} from 'react-redux'
import {obtenerProductosAccion} from '../redux/productosDuks'
export const Productos = () => {
    const dispatch = useDispatch()
    const productos = useSelector(store => store.productos.array)

    useEffect(() => {
       dispatch(obtenerProductosAccion())
        
       
    }, [])
    
    return (
       
       <div>
            <p>Productos...{productos != null? productos.length :'no tiene'} </p>
        </div>
    )
}
