import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './EditarProfessor.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import { useNavigate, useParams } from 'react-router-dom'
import AuthProvider from '../../../provider/authProvider'
import Error from '../../alerts/Error'
import axios from 'axios'

const EditarProfessor = () => {
    const { idProf } = useParams()
    const auth = AuthProvider()
    const [newName, setNewName] = useState('')
    const navigate = useNavigate()
    const cancelar = () =>{
        Confirm.cancel().then(async (result) => {
            if(result.isConfirmed){
                navigate(-1)
            }
        })
    }

    const updateProfessor = async (e) => {
        e.preventDefault()
        Confirm.editar().then(async (result) => {
            if (result.isConfirmed) {
                if (newName === '') {
                    Error.erro('Informe o nome do professor!')
                }
                const token = auth.token
                const url = `http://127.0.0.1:8000/api/professores/${idProf}/`;

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    nome_prof: newName
                }
                try {
                    const response = await axios.patch(url, data, config);
                    if (response.status === 200) {
                        Sucess.editado()
                    } else {
                        Error.erro('Erro ao editar nome do professor!')
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }

            }
        })
    };


    const fetchProfessors = useCallback(async () => {

        const token = localStorage.getItem('token');
        const url = `http://127.0.0.1:8000/api/professores/${idProf}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const professorsData = response.data
                setNewName(professorsData.nome_prof);
            } else {
                console.log('Erro ao listar professores.')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }, [idProf]);

    useEffect(() => {
        fetchProfessors();
    }, [fetchProfessors]);

    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <main id="entidades">
                <div id="menu"><Menu /></div>
                <section className="conteudo edProf">
                    <h1>Editar Professor</h1>
                    <section className="editarProf">
                        <form onSubmit={updateProfessor} className='input-group'>
                            <input type="text" placeholder='Nome do Professor' value={newName} onChange={e => setNewName(e.target.value)} />
                        </form>
                        <div>
                            <button onClick={cancelar} id='cancel' className="botoesCad" >Cancelar</button>
                            <button onClick={updateProfessor} className="botoesCad" id='cad'>Editar</button>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default EditarProfessor