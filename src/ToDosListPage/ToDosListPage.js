import React, { Component } from 'react'
import { addTodo, completeTodo, getTodos } from '../api-utils.js';



export default class ToDosListPage extends Component {
    state = {
        todos: [],
        importance: '',
        todo: ''
    }

    componentDidMount = async () => {
        await this.fetchTodos();
    }
    fetchTodos = async () => {
        const todos = await getTodos(this.props.user.token);

        this.setState({ todos });
    }

    handleSubmit = async e => {
        e.preventDefault();

        await addTodo(this.state.todo, this.state.importance, this.props.user.token);

        await this.fetchTodos();

        this.setState({ todo: '', importance: '' })
    }

    handleTodoChange = e => this.setState({ todo: e.target.value })

    handleImportanceChange = e => this.setState({ importance: e.target.value })

    handleComplete = async (todoId) => {
        await completeTodo(todoId, this.props.user.token);

        this.fetchTodos();
    }

    render() {
        return (
            <div className='to-do-page'>
                <form className='set-todo' onSubmit={this.handleSubmit}>
                    <input value={this.state.todo} onChange={this.handleTodoChange} />
                    <select value={this.state.importance} onChange={this.handleImportanceChange}>
                        <option value='High'>High</option>
                        <option value='Medium'>Medium</option>
                        <option value='Low'>Low</option>

                    </select>
                    <button>Add a To Do Item!</button>
                    <article>
                        <h2>To Do List:</h2>
                    </article>
                </form>
                {!this.state.todos.length && <p>Crumble up the list & throw it away!</p>}
                {this.state.todos.map(todo =>
                    <p
                        key={`${todo.todo}-${todo.id}`}
                        onClick={() => this.handleComplete(todo.id)}
                        className={`
                            todo ${todo.completed
                                ? 'completed'
                                : ''}`
                        }>
                        {todo.todo}
                    </p>)}

            </div>
        )
    }
}
