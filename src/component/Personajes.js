import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {

    state = {
        personajes: []
    }

    loadPersonajes = () => {
        let request = "/api/Series/PersonajesSerie/" + this.props.id
        let url = Global.urlApi + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadPersonajes()
    }

    render() {
        if (this.state.personajes.length != 0) {
            return (
                <div>
                    <NavLink to={"/detail/" + this.props.id} className="btn btn-danger">Volver a serie</NavLink>
                    <table className='table table-light'>
                        <thead>
                            <tr>
                                <th>Personaje</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.personajes.map((personaje, index)=>{
                                    return(<tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td><img src={personaje.imagen} style={{height: "150px", width: "150px"}}></img></td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }else{
            return(<h1>Cargando</h1>)
        }
    }
}
