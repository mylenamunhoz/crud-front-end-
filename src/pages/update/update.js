import React, { Component } from "react";
import './update.css';
import { Redirect } from "react-router-dom";
import api from '../../services/services';

class EditarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                matricula: 0,
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        };
        
    }

    async componentDidMount () {
        const { id } = this.props.match.params;
    
        const response = await api.get(`/usuarios/${id}`);
    
        this.setState({ usuario: response.data });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="usuario-update">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="sexo"
                                    value="male"
                                    checked={this.state.usuario.sexo === "male"}
                                    onChange={this.handleInputChange}
                                />
                                Masculino
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="female"
                                    name="sexo"
                                    checked={this.state.usuario.sexo === "female"}
                                    onChange={this.handleInputChange}
                                />
                                Feminino
                        </label>
                        </div>
                            <div className="usuario-insert">
                                <label htmlFor="idade"> Idade</label>
                                <br />
                                <input
                                    type="integer"
                                    id="idade"
                                    name="idade"
                                    placeholder="Digite sua idade"
                                    required
                                    value={this.state.usuario.idade}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="usuario-insert">
                                <label htmlFor="hobby"> Hobby</label>
                                <br />
                                <input
                                    type="text"
                                    id="hobby"
                                    name="hobby"
                                    placeholder="Digite seu hobby"
                                    required
                                    value={this.state.usuario.hobby}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="usuario-insert">
                                <label htmlFor="dataNascimento"> Data de Nascimento</label>
                                <br />
                                <input
                                    type="date"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    placeholder="Digite sua data de nascimento"
                                    required
                                    value={this.state.usuario.dataNascimento}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                        </button>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const usuario = { ...prevState.usuario };
            usuario.endereco[name] = value;
            return { usuario }
        })
    };

    handleSubmit = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3001/sistema/usuarios/${id}`, {
            method: "put",
            id: id,
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })


        event.preventDefault();
    };
}

export default EditarUsuario;
