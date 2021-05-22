import {auth ,db, firebase,storage} from '../firebase'
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
const UPDATE_USER = 'UPDATE_USER'
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
        case UPDATE_USER:
            return{...state, loading:false, Usuario:action.payload}
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
            const usuario = {
                uid:res.user.uid,
                email:res.user.email,
                displayName:res.user.displayName,
                photoURL:res.user.photoURL
            }
             const usuarioDB = await db.collection('usuarios').doc(usuario.email).get()
                if(usuarioDB.exists){
                    dispatch({
                        type:USUARIO_LOGUEADO,
                        payload:usuarioDB.data()
                      })
                      localStorage. setItem('usuario' , JSON.stringify(usuarioDB.data()))   
                }else{
                    await db.collection('usuarios').doc(usuario.email).set(usuario)
                    dispatch({
                       type:USUARIO_LOGUEADO,
                       payload:usuario
                   })
                   localStorage.setItem('usuario',JSON.stringify(usuario))
                }
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

export const updateUser =(user)=> async(dispatch ,getState)=>{
     dispatch({
         type:LOADING
     })
    const {Usuario} = getState().usuario
    console.log(Usuario)
        try{
            await db.collection('usuarios').doc(Usuario.email).update({
                displayName:user
            })
            const usuario = {
                    ...Usuario ,
                        displayName:user
            }
            dispatch({
                type:UPDATE_USER,
                payload:usuario
            })
            localStorage.setItem('usuario' , JSON.stringify(usuario))
        }catch(error){
            console.log(error)
        }
    
}
export const updateImage =(img)=> async(dispatch,getState)=>{
    dispatch({
        type:LOADING
    })
    const {Usuario} = getState().usuario
    try {
            const imageRef = await storage.ref().child(Usuario.email).child('foto_perfil')
            await imageRef.put(img)
            const imagenURL = await imageRef.getDownloadURL()
                await db.collection('usuarios').doc(Usuario.email).update({
                    photoURL:imagenURL
                })
            const usuario = {
                ...Usuario , photoURL:imagenURL
            }
            dispatch({
                type:UPDATE_USER,
                payload:usuario
            })
        localStorage.setItem('usuario' , JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}

