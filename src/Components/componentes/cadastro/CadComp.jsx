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
    const { token, checkTokenExpiration } = useAuth();

    const cancelar = () => {
        checkTokenExpiration()
        Confirm.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate('/home')
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        checkTokenExpiration()
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {

                const url = 'http://3.221.150.138:8000/api/componentes/'
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
                        Sucess.cadastro()
                        setCodigo('')
                        setIsChecked(false)
                        setNome('')
                        setSelectCH('')
                        setSelectDP('')
                        setSelectSM('')

                    }
                } catch (error) {
                    if (error.response) {
                        // Se houver dados na resposta, exiba a mensagem para o usuário
                        Erro.erro(Object.values(error.response.data).join('\n'));
                    } else {
                        console.error('Erro na requisição:', error.message);
                        Erro.erro('Erro desconhecido');
                    }
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
                    <section className='formCadComp'>
                        <div className="header-section">
                            <h2>Preencha as Informações</h2>
                            <p>Forneça as credenciais necessárias para cadastrar este componente.</p>
                            <p>Nota: Não é permitido cadastrar o mesmo componente mais de uma vez, nem incluir caracteres especiais nos campos, ou deixar alguma informação em branco. Além disso, se o componente não for obrigatório, não é necessário informar o semestre.</p>
                        </div>
                        <form onSubmit={handleSubmit} className='formContainer'>
                            <div className="columnsFather">
                                <div className="columnSon">
                                    <label ><input type="text" placeholder='Código' value={codigo} onChange={e => setCodigo(e.target.value)} className='inputField' /><span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <label ><input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)} className='inputField' /><span style={{ color: 'red', marginLeft: '2px' }}>*</span></label>
                                    <label >
                                        <input type="checkbox" placeholder='Obrigatório' checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />Obrigatório
                                    </label>
                                </div>
                                <div className="columnSon">
                                    <label >
                                        <select value={selectSM} onChange={e => setSelectSM(e.target.value)} className='selectField' >
                                            <option selected value="0">Semestre</option>
                                            <option value="1">1º Semestre</option>
                                            <option value="2">2º Semestre</option>
                                            <option value="3">3º Semestre</option>
                                            <option value="4">4º Semestre</option>
                                            <option value="5">5º Semestre</option>
                                            <option value="6">6º Semestre</option>
                                        </select><span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                    </label>
                                    <label >
                                        <select value={selectCH} onChange={e => setSelectCH(e.target.value)} className='selectField' >
                                            <option selected value=''>Carga Horária</option>
                                            <option value="15">15 Horas</option>
                                            <option value="30">30 Horas</option>
                                            <option value="45">45 Horas</option>
                                            <option value="60">60 Horas</option>
                                            <option value="75">75 Horas</option>
                                            <option value="90">90 Horas</option>
                                        </select><span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                    </label>
                                    <label >
                                        <select value={selectDP} onChange={e => setSelectDP(e.target.value)} className='selectField' >
                                            <option selected value=''>Departamento</option>
                                            <option value="DECEN">DECEN</option>
                                            <option value="DCSAH">DCSAH</option>
                                            <option value="DETEC">DETEC</option>
                                        </select><span style={{ color: 'red', marginLeft: '2px' }}>*</span>
                                    </label>
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