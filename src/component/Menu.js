import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from './Global'
import axios from 'axios'

export default class Menu extends Component {

    state = {
        series: []
    }

    loadSeries = () =>{
        let request = "api/series"
        let url = Global.urlApi + request
        axios.get(url).then(response=>{
            this.setState({
                series: response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <div>
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
                        <div className="container-fluid">
                            <h2 className="navbar-brand" >Crud Series</h2>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarsExample03">
                                <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/create">Crear Personaje</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/edit">Modificar Personaje</NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Series</a>
                                        <ul className="dropdown-menu">
                                            {
                                                this.state.series.map((serie, index)=>{
                                                    return(<li key={index}><NavLink className={"dropdown-item"} to={"/detail/" + serie.idSerie}>{serie.nombre}</NavLink></li>)
                                                })
                                            }
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
