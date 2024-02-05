import React, {Component} from "react";
import "./ListaTarefas.css"


import Form from './Form'
import Tarefas from "./Tarefas"

export default class ListaTarefas extends Component {
    componentDidUpdate(prevProps, prevState) {
        const {tarefas} = this.state
        if (tarefas === prevState.tarefas) return
        localStorage.setItem("tarefas", JSON.stringify(this.state.tarefas))
    }

    state = {
        novaTarefa: '',
        tarefas: JSON.parse(localStorage.getItem("tarefas")) || [],
        index: -1
    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {tarefas, index} = this.state
        let {novaTarefa} = this.state
        novaTarefa = novaTarefa.trim()
        if (tarefas.includes(novaTarefa)) {
            return
        }
        const novasTarefas = [...tarefas]
        if (index === -1) {
            this.setState({
                tarefas: [...novasTarefas, novaTarefa]
            })
        } else {
            novasTarefas[index] = novaTarefa

            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
            })
        }
    }

    handleDelete = (e, index) => {
        const {tarefas} = this.state
        let {novaTarefa} = this.state
        const novasTarefas = [...tarefas]
        novasTarefas.splice(index, 1)
        this.setState({
            tarefas: [...novasTarefas]
        })
    }

    handleEdit = (e, index) => {
        const {tarefas} = this.state
        this.setState({
            index,
            novaTarefa: tarefas[index]
        })

    }

    render() {
        const {novaTarefa, tarefas} = this.state;
        return (
            <div className="main">
                <h1>Lista de tarefas</h1>

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <Tarefas
                    tarefas={tarefas}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                />
            </div>
        )
    }
}