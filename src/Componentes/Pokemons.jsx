import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {obtenerPokemonesAccion, Siguientes , Anteriores, detallePokemon} from '../redux/pokeDuks'
import Poke from './Poke'

const Pokemons = () => {
    const dispatch = useDispatch()
    const pokemones = useSelector(store => store.pokemons.results)    
     const {next} =  useSelector(store => store.pokemons)
     const {previous} = useSelector(store => store.pokemons)
     const poke = useSelector(store=> store.pokemons.unPokemon)
       
    
    
    
    
    return (
        <div className="row container-fluid px-5 mt-2 pb-3">
           <div className="col-md-6">
            <h3 className="shadow-sm p-3 mb-5 bg-transparent rounded text-white">Lista de Pokemones</h3>
               
            <ul className="list-group mt-3 bg-transparent">
                     {
                         pokemones.map((e,index)=><li className="list-group-item text-uppercase bg-transparent border" 
                         key={index}>
                             <span className="text-white">{e.name}</span>
                             <button onClick={()=>dispatch(detallePokemon(e.url))}
                             className="btn btn-outline-info btn-sm float-end">Info</button>
                        </li>)
                     }
                </ul>
              <div className="d-flex justify-content-between mt-3 px-3">
              {
                pokemones.length === 0 &&
                <button onClick={()=>dispatch(obtenerPokemonesAccion())} className="btn btn-outline-dark btn-sm">Obtener</button>
               } 
               
               {
                   previous &&
                    <button onClick={()=>dispatch(Anteriores())} className="btn btn-outline-secondary btn-sm">Anteriores</button>
               }
               
               {
                   next &&
                <button onClick={()=>dispatch(Siguientes())} className="btn btn-dark btn-sm">Siguientes</button>
               }
              </div>
                
           </div>
            <div className="col-md-6">
               <h3 className="shadow-sm p-3 mb-5 bg-body rounded bg-transparent text-white"> Detalle de un pokemon</h3>
                     <div>
                         <Poke></Poke>
                     </div>
                
                    
                
            </div>
        </div>
    )
}


export default Pokemons
