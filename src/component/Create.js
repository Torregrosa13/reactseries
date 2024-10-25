import axios from 'axios'
import React, { Component } from 'react'
import Global from './Global'
import { Navigate } from 'react-router-dom';

export default class Create extends Component {

    boxName = React.createRef()
    boxImagen = React.createRef()
    selectSerie = React.createRef()

    state = {
        status: false,
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

    insertPersonaje = (e) => {
        e.preventDefault();
        let request = "api/personajes"
        let url = Global.urlApi + request;

        let personaje = {
            idPersonaje: parseInt(Math.random() * 10),
            nombre: this.boxName.current.value,
            imagen: this.boxImagen.current.value,
            idSerie: parseInt(this.selectSerie.current.value)
        }

        console.log(personaje)

        axios.post(url, personaje).then(response => {
            this.setState({
                status: true
            })
        })
    }

    render() {
        if (this.state.status == true) {
            return (<Navigate to={"/personajes/" + this.selectSerie.current.value} />)
        } else {
            return (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <h5 className="card-title text-center">Crear Personaje</h5>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type='text' ref={this.boxName} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Imagen</label>
                                    <input type='text' ref={this.boxImagen} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Serie</label>
                                    <select ref={this.selectSerie}>
                                        {
                                            this.state.series.map((serie, index)=>{
                                                return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <button type="button" onClick={this.insertPersonaje} className='btn btn-success w-100'>Insertar</button>
                            </form>
                        </div>
                    </div>
                </div>)
        }
    }
}
