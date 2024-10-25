import React, { Component } from 'react'
import Global from './Global'
import axios from 'axios'
import { Navigate, NavLink } from 'react-router-dom'

export default class Detail extends Component {

    state = {
        serie: null
    }

    loadSerie = () =>{
        let idserie = this.props.id
        let request = "api/series/" + idserie
        let url = Global.urlApi + request
        axios.get(url).then(response=>{
            this.setState({
                serie: response.data
            })
        })
    }

    componentDidMount = () =>{
        this.loadSerie()
    }

    componentDidUpdate = (oldProps) =>{
        console.log(this.props.id)
        console.log(oldProps.id)
        if(this.props.id != oldProps.id){
            this.loadSerie();
        }
    }

  render() {
    if(this.state.serie){
        return(
        <div className="container mt-5">
              <div className="card mx-auto" style={{ width: '18rem' }}>
                <img src={this.state.serie.imagen} className="card-img-top" alt="Alumno" />
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className='list-group-item'>{this.state.serie.nombre}</li>
                    <li className='list-group-item'>{this.state.serie.puntuacion}</li>
                    <NavLink className="btn btn-info" to={"/personajes/" + this.state.serie.idSerie}>Personajes</NavLink>
                  </ul>
                </div>
              </div>
            </div>
        )
    }else{
        return(<h1>Cargando</h1>)
    }
  }
}
