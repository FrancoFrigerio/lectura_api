import axios from 'axios'

//constantes
const dataInicial = {
    count:0,
    next:null,
    previous:null,
    results:[],
    
}



const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const OBTENER_ANTERIORES_POKEMONES_EXITO = 'OBTENER_ANTERIORES_POKEMONES_EXITO'
const OBTENER_SIGUIENTES_POKEMONES_EXITO = 'OBTENER_SIGUIENTES_POKEMONES_EXITO'
const OBTENER_INFO_POKE = 'OBTENER_INFO_POKE'
//reducer
export default function pokeReducer(state=dataInicial , action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state , ...action.payload}
        case OBTENER_SIGUIENTES_POKEMONES_EXITO:
            return {...state , ...action.payload}
        case OBTENER_ANTERIORES_POKEMONES_EXITO:
            return {...state , ...action.payload}
        case OBTENER_INFO_POKE:
            return {...state , unPokemon:action.payload}
            default:
                return state
        }
}

//acciones
export const detallePokemon =(url = 'https://pokeapi.co/api/v2/pokemon/1/')=>async(dispatch)=>{
        if(localStorage.getItem(url)){
            console.log('desde el local')
            dispatch({
                type: OBTENER_INFO_POKE,
                payload:JSON.parse(localStorage.getItem(url))
               
            }) 
            return
        }
          try{
           const res = await axios.get(url)
           console.log(res.data) 
           dispatch({
               type: OBTENER_INFO_POKE,
               payload:{
                   nombre:res.data.name,
                   ancho:res.data.weight,
                   alto:res.data.height,
                   foto:res.data.sprites.front_default
                }
            })
            localStorage.setItem(url ,JSON.stringify({
                    nombre:res.data.name,
                    ancho:res.data.weight,
                    alto:res.data.height,
                    foto:res.data.sprites.front_default
            }))
        }catch(error){
        console.log(error)
    }
}
export const obtenerPokemonesAccion =()=>async(dispatch , getState)=>{
    if(localStorage.getItem('offset=0')){
        console.log('desde el local')
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload:JSON.parse(localStorage.getItem('offset=0'))
        })
    }else{
        try{
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
            console.log('desde la api')
            localStorage.setItem('offset=0', JSON.stringify(res.data))
            dispatch({
                type: OBTENER_POKEMONES_EXITO,
                payload:res.data
            })
        }catch(error){
            console.log(error)
        }
    }
    
}
 export const Siguientes =()=>async(dispatch , getState)=>{
      const {next} = getState().pokemons
        if(localStorage.getItem(next)){
            console.log('toma desde el local')
            dispatch({
                type: OBTENER_SIGUIENTES_POKEMONES_EXITO,
                payload:JSON.parse(localStorage.getItem(next)),
            })
            return
        }
        
        try{
            const res = await axios.get(next)
            console.log('toma desde la api')
          dispatch({
              type: OBTENER_SIGUIENTES_POKEMONES_EXITO,
              payload:res.data,
            })
            
            localStorage.setItem(next , JSON.stringify(res.data))
      }catch(error){
          console.log(error)
      }
 }


export const Anteriores =()=>async(dispatch , getState)=>{
    const {previous} = getState().pokemons
        if(!previous){
            return alert('No se puede ir más atras') 
        }
        if(localStorage.getItem(previous)){
            console.log('desde el local')
            dispatch({
                type: OBTENER_ANTERIORES_POKEMONES_EXITO,
                payload:JSON.parse(localStorage.getItem(previous))
            })
            return
            
        }else{
            dispatch({
                type: OBTENER_ANTERIORES_POKEMONES_EXITO,
                payload:JSON.parse(localStorage.getItem('offset=0'))
            })
        }
        
        try{
            const res = await axios.get(previous)
            console.log('desde la api')
        
        dispatch({
            type: OBTENER_ANTERIORES_POKEMONES_EXITO,
            payload:res.data
        })
        localStorage.setItem(previous,JSON.stringify(res.data))
           
    }catch(error){
        console.log(error)
    }
     
}


 