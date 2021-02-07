import React, { Component } from 'react';
import api from '../../services/services';
import { Link } from "react-router-dom";

export default class Usuario extends Component {
    state = {
        usuario: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/usuarios/${id}`);

        this.setState({ usuario: response.data });
    }

    render() {
        const { usuario } = this.state;

        return (
            <div className="usuario-info">
                <h1>{usuario.nome}</h1>
                <h1>{usuario.sexo}</h1>
                <h1>{usuario.idade}</h1>
                <h1>{usuario.hobby}</h1>
                <h1>{usuario.dataNascimento}</h1>
                <br />
                <Link to={`/`}> Voltar </Link> <br/>
                <Link to={`/EditarUsuario/${usuario._id}`}> Editar </Link> <br/>
                <Link to={`/DeletarUsuario/${usuario._id}`}> Deletar </Link> <br/>
            </div>
        );
    }
}