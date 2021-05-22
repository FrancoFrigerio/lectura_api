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
        <div className='card text center'>
            <div className=
              {pokemon.types[0].type.name === 'fire'?(
                'card-body cont_border borderFire'
                ):(pokemon.types[0].type.name === 'grass'?(
                    'card-body cont_border borderGrass'
                ):(pokemon.types[0].type.name === 'water'?(
                    'card-body cont_border borderWater'
                ):(pokemon.types[0].type.name === 'poison'?(
                    'card-body cont_border borderPoison'
                ):(pokemon.types[0].type.name === 'electric'?(
                    'card-body cont_border borderElectric'
                ):(pokemon.types[0].type.name === 'ground'?(
                    'card-body cont_border borderGround'
                ):(pokemon.types[0].type.name === 'rock'?(
                    'card-body cont_border borderRock'
                ):(pokemon.types.map(e=>e.type.name ==='flying'?(
                    'card-body cont_border borderFlying'
                ):('card-body cont_border borderGeneric')))))))))}>
            <div className="card-title text-uppercase ">{pokemon.nombre}</div>
               <div className="d-flex justify-content-evenly">
                    <img src={pokemon.foto} className="img-fluid img_poke"></img>
                    <div className="d-flex flex-column">
                        <p className="card-text badge rounded-pill bg-secondary">Altura: {pokemon.alto}</p>
                        <p className="card-text badge rounded-pill bg-secondary">Ancho: {pokemon.alto}</p>
                     </div>
               </div>
                    
            <div className="pb-2 cont_atributos">
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase">Fuerza</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[0].base_stat}%`}} aria-valuemax={{value:100}}></div>
                        </div>
                </div>
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase">Ataque</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[1].base_stat}%`}} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                </div>
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase">Defensa</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[2].base_stat}%`}}aria-valuenow={{value:25}} aria-valuemin={{value:0}} aria-valuemax={{value:100}}></div>
                        </div>
                </div> 
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase">Ataque Especial</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[3].base_stat}%`}}aria-valuenow={{value:25}} aria-valuemin={{value:0}} aria-valuemax={{value:100}}></div>
                        </div>
                </div> 
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase">Defensa Especial</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[4].base_stat}%`}}aria-valuenow={{value:25}} aria-valuemin={{value:0}} aria-valuemax={{value:100}}></div>
                        </div>
                </div> 
                <div className="px-3">
                    <span className="d-flex flex-start mt-2 text-uppercase ">Velocidad</span>
                        <div className="progress barra" style={{height: 7}}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${pokemon.stats[5].base_stat}%`}}aria-valuenow={{value:25}} aria-valuemin={{value:0}} aria-valuemax={{value:100}}></div>
                        </div>
                </div>      
            </div>
            </div>
            
        </div>
    ):null
}

export default Poke
