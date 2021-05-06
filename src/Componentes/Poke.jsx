import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {detallePokemon} from '../redux/pokeDuks'


const Poke = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector(store => store.pokemons.unPokemon)
    useEffect(() => {
        const fetchData =()=>{
            dispatch(detallePokemon())
        }
        fetchData()
            
    }, [dispatch])
    
    
    
   
      
        
   
   return pokemon ?(
        <div className="card mt-3 text-center">

                <div className="card-body">
                    <div className="card-title text-uppercase ">{pokemon.nombre}</div>
                    <img src={pokemon.foto} className="img-fluid"></img>
                     <p className="card-text">Alto: {pokemon.alto}  |  Ancho: {pokemon.ancho}  </p>
                </div>
        </div>
    ):null
}

export default Poke
