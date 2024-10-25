import React, { Component } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Home from './Home'
import Menu from './Menu'
import Detail from './Detail'
import Personajes from './Personajes'
import Create from './Create'
import Edit from './Edit'

export default class Router extends Component {
  render() {

    function DetailElement(){
        let {id} = useParams();
        return(<Detail id={id}/>)
    }

    function PersonajeElement(){
        let {id} = useParams();
        return(<Personajes id={id}/>)
    }

    return (
        <BrowserRouter>
        <Menu/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/create' element={<Create/>}/>
                <Route path='/edit' element={<Edit/>}/>
                <Route path='/detail/:id' element={<DetailElement/>}/>
                <Route path='/personajes/:id' element={<PersonajeElement/>}/>
            </Routes>
        </BrowserRouter>
    )
  }
}
