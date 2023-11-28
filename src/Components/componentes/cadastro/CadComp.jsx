import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadComp.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import Erro from '../../alerts/Erro'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CadComp = () => {
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [selectCH, setSelectCH] = useState();
    const [selectDP, setSelectDP] = useState();
    const [selectSM, setSelectSM] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth()

    const cancelar = () => {
        console.log('chamou')
        Confirm.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate('/home')
            }
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {
                if (!selectCH || !selectDP || nome === '' || codigo === '') {
                    Erro.erro('Por favor, preencha todos os campos obrigatórios.')
                    return
                }
                if (isChecked && !selectSM) {
                    Erro.erro('Para componentes obrigatórios, deve-se selecionar um semestre!')
                }
                if (codigo.length !== 7) {
                    Erro.erro('Código do componente precisa ter 7 caracteres!')
                    return
                }
                const url = 'http://127.0.0.1:8000/api/componentes/'
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const data = {
                    nome_comp: nome,
                    codigo: codigo,
                    num_semestre: selectSM,
                    carga_horaria: selectCH,
                    departamento: selectDP,
                    obrigatorio: isChecked,
                }

                try {
                    const response = await axios.post(url, data, config);
                    if (response.status === 201) {
                        Sucess.cadastro().then(async (result) => {
                            if (result.isConfirmed) {
                                navigate('/componentes/cadastrarComponente', { replace: true })
                                window.location.reload();
                            }
                        })
                    } else {
                        Erro.erro('Erro ao cadastrar Componente.')
                    }
                } catch (error) {
                    console.error(error)
                }

            }
        })

    };
    return (
        <React.Fragment>
            <Header titulo={'Cadastrar Componente'} link={'/Home'} />
            <main id='entidades'>
                <div id="menu"><Menu /></div>
                <section className='conteudo cadComp'>
                    {/* <h1>Cadastrar Componente</h1> */}
                    <section className='formCadComp'>
                        <div className="header-section">
                            <h2>Preencha as Informações</h2>
                            <p>Forneça as credenciais necessárias para cadastrar este componente.</p>
                            <p>Nota: Não é permitido cadastrar o mesmo componente mais de uma vez, nem incluir caracteres especiais nos campos, ou deixar alguma informação em branco. Além disso, se o componente não for obrigatório, não é necessário informar o semestre.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='formContainer'>
                            <div className="columnsFather">
                                <div className="columnSon">
                                    <input type="text" placeholder='Código' value={codigo} onChange={e => setCodigo(e.target.value)} className='inputField' />
                                    <input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)} className='inputField' />
                                    <label >
                                        <input type="checkbox" placeholder='Obrigatório' checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />Obrigatório
                                    </label>
                                </div>
                                <div className="columnSon">
                                    <select value={selectSM} onChange={e => setSelectSM(e.target.value)} className='selectField' >
                                        <option selected disabled>Semestre</option>
                                        <option value="1">1º Semestre</option>
                                        <option value="2">2º Semestre</option>
                                        <option value="3">3º Semestre</option>
                                        <option value="4">4º Semestre</option>
                                        <option value="5">5º Semestre</option>
                                        <option value="6">6º Semestre</option>
                                    </select>
                                    <select value={selectCH} onChange={e => setSelectCH(e.target.value)} className='selectField' >
                                        <option selected disabled>Carga Horária</option>
                                        <option value="15">15 Horas</option>
                                        <option value="30">30 Horas</option>
                                        <option value="45">45 Horas</option>
                                        <option value="60">60 Horas</option>
                                        <option value="75">75 Horas</option>
                                        <option value="90">90 Horas</option>
                                    </select>
                                    <select value={selectDP} onChange={e => setSelectDP(e.target.value)} className='selectField' >
                                        <option selected disabled>Departamento</option>
                                        <option value="DECEN">DECEN</option>
                                        <option value="DCSAH">DCSAH</option>
                                        <option value="DETEC">DETEC</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <div className="footerCad">
                            <button onClick={cancelar} id='cancel' className="botoesCad" >Cancelar</button>

                            <button onClick={handleSubmit} className='botoesCad' id='cad'>Cadastrar</button>
                        </div>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default CadComp