import React from "react";
// import UserList from "../userLists/UserLists";
import Header from '../header/Header'
import Footer from '../footer/Footer'
import './Login.css'
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleChange(event) {
        this.setState({ login: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit(event) {
        let url = 'http://127.0.0.1:8000/api-token-auth/'
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.login, password: this.state.password })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                this.setState({token: data.token})
        });
        event.preventDefault()
    }
    sair(){
        localStorage.removeItem('token')
        this.setState({token: null})
    }
    render() {
        let token = localStorage.getItem('token')
        if(!token){
            return (
                <React.Fragment>
                    <Header link={'/'}/>
                    <main id="login">
                        <div id="filtro">
                            <div id="formulario">
                                <h2>Login</h2>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <input type="text" value={this.state.login} onChange={this.handleChange} placeholder="Email" className="infoLogin"/>
                                    </label>
                                    <label>
                                        <input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" className="infoLogin"/>
                                    </label>
                                    <label className="conectado">
                                        <input type="checkbox" /><p>Deixar-me conectado.</p>
                                    </label>
                                    <input type="submit" value="ENTRAR"  className="submit"/>
                                </form>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </React.Fragment>
            );
        }else{
            return(
                <React.Fragment>
                    {/* <UserList/> */}
                    <button onClick={() => this.sair()}>Sair</button>
                </React.Fragment>
            )
        }
    }
}
export default Login