import React from 'react'
import Pokemons from './Componentes/Pokemons'
import generateStore from './redux/store'
import {Provider} from 'react-redux'
import { Productos } from './Componentes/Productos'
function App() {
 
  const store = generateStore()
  return (
    <div className="App container">
     
        <Provider store={store}>
          <Pokemons></Pokemons>
          {/* <Productos></Productos> */}
        </Provider>
    </div>
  );
}

export default App;
