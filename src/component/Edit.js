import axios from 'axios'
import React, { Component } from 'react'
import Global from './Global'
import { Navigate } from 'react-router-dom';

export default class Edit extends Component {

    selectSerie = React.createRef();
    selectPersonaje = React.createRef();

    state = {
        series: [],
        personajes: [],
        status: false
    }

    loadSeries = () => {
        let request = "api/series"
        let url = Global.urlApi + request
        axios.get(url).then(response => {
            this.setState({
                series: response.data
            })
        })
    }

    loadPersonajes = () => {
        let request = "api/personajes"
        let url = Global.urlApi + request
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data
            })
        })
    }

    componentDidMount = () => {
        this.loadPersonajes();
        this.loadSeries();
    }

    editPersonajeSerie = (e) => {
        e.preventDefault();
        let idP = this.selectPersonaje.current.value
        let idS = this.selectSerie.current.value
        let request = "api/personajes/" + idP + "/" + idS
        let url = Global.urlApi + request
        axios.put(url).then(response => {
            this.setState({
                status: true
            })
        })
    }

    render() {
        if (this.state.status === true) {
            return(<Navigate to={"/personajes/" + this.selectSerie.current.value}/>)
        } else {
            return (
                <div>
                    <h1>Edit</h1>
                    <select ref={this.selectSerie}>
                        {
                            this.state.series.map((serie, index) => {
                                return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })
                        }
                    </select>
                    <select ref={this.selectPersonaje}>
                        {
                            this.state.personajes.map((personaje, index) => {
                                return (<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>)
                            })
                        }
                    </select>
                    <button className='btn btn-info' onClick={this.editPersonajeSerie}>Modificar Personaje</button>                    
                </div>
            )
        }
    }
}
