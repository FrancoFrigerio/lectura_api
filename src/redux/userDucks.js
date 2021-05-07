import {auth , firebase} from '../firebase'
//data inicial
const dataInicial = {
    loading:false,
    activo:false,
   
}
//types
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_LOGUEADO = 'USUARIO_LOGUEADO'
const LOG_OUT = 'LOG_OUT'
//reducer
export default function usuarioReducer (state=dataInicial , action){
    switch(action.type){
        case LOADING:
            return{...state ,loading:true}
        case USUARIO_LOGUEADO:
            return{...state , loading:false ,activo:true,  Usuario:action.payload}
        case USUARIO_ERROR:
            return{...state, loading:false, Message:action.payload}
        case LOG_OUT:
            return{...dataInicial}
        default:
            return {...state}
    }

}
//actions
export const ingresoUsuario =()=> async(dispatch, getState)=>{
    dispatch({
        type:LOADING
    })
    try {
          const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider)
            // const user = res.additionalUserInfo.profile
             dispatch({
                 type:USUARIO_LOGUEADO,
                 payload:{
                     uid:res.user.uid,
                     email:res.user.email,
                     name:res.user.displayName
                 }
             })
                localStorage. setItem('usuario' , JSON.stringify({
                    uid:res.user.uid,
                    email:res.user.email,
                    name:res.user.displayName
                }))
            console.log(res)
    } catch (error) {
        console.log(error)
        switch (error.code) {
            case 'auth/popup-closed-by-user':
                dispatch({
                    type:USUARIO_ERROR,
                    payload:{
                        message:'El usuario cerró la ventana de login'
                    }
                })
                break;
            default:
                break;
        }
    }
}

export const getUserStorage =()=>(dispatch)=>{
    if(localStorage.getItem('usuario')){
        console.log('tomamos el usuario desde el local')
        dispatch({
            type:USUARIO_LOGUEADO,
            payload:JSON.parse(localStorage.getItem('usuario'))
        })
    }
}

export const closeSession =()=>(dispatch)=>{
    auth.signOut()
    localStorage.removeItem('usuario')
        dispatch({
            type:LOG_OUT
        })
}

