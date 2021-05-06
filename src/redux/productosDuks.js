import axios from 'axios'

//constantes
const dataInicial = {
    array:[]
}
const OBTENER_PRODUCTOS_EXITO = 'OBTENER_PRODUCTOS_EXITO'

//reducer
export default function productoReducer(state=dataInicial , action){
    switch(action.type){
        case OBTENER_PRODUCTOS_EXITO:
            return{
                ...state , array: action.payload
            }
            default:
                return state
    }
}
//acciones
export const obtenerProductosAccion =()=> async(dispatch, getState)=>{
    try{
        const res = await axios.get('https://huwak.herokuapp.com/productos')
            dispatch({
                type: OBTENER_PRODUCTOS_EXITO,
                payload:res.data
            })
    }catch(error){
        console.log(error)
    }
}