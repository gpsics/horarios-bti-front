import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import Menu from '../../menuLateral/Menu'
import './CadComp.css'

const CadComp = () => {
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [selectCH, setSelectCH] = useState();
    const [selectDP, setSelectDP] = useState();
    const [selectSM, setSelectSM] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [erro, setErro] = useState('')
    const [mensagem, setMensagem] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErro('')
        setMensagem('')

        const token = localStorage.getItem('token');
        if (!token) {
            setErro('Você precisa estar logado para cadastrar um componente.');
            return;
        }
        const url = 'http://127.0.0.1:8000/componentes/'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                nome: nome,
                codigo: codigo,
                num_semestre: selectSM,
                carga_horaria: selectCH,
                departamento: selectDP,
                obrigatorio: isChecked,
            }),
        };
        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setNome()
                setCodigo()
                setIsChecked()
                setSelectCH()
                setSelectDP()
                setSelectSM()
                setMensagem('Componente Cadastrado com sucesso!')
            } else {
                setErro('Erro ao cadastrar Componente.')
            }
        } catch (error) {
            console.error(error)
        }

    };


    return (
        <React.Fragment>
            <Header link={'/Home'} />
            <menu id='entidades'>
                <div className="menu"><Menu /></div>
                <section className='conteudo cadComp'>
                    <h3>Cadastrar Componente</h3>
                    <section className='formCadComp'>
                        <form onSubmit={handleSubmit} className='formContainer'>
                            <div className="columnsFather">
                                <div className="columnSon">
                                    <input type="text" placeholder='Código' value={codigo} onChange={e => setCodigo(e.target.value)} className='inputField' />

                                    <input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)} className='inputField' />

                                    <label >
                                        <input type="checkbox" placeholder='Obrigatório' checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />
                                        Obrigatório
                                    </label>
                                </div>
                                <div className="columnSon">
                                    <select value={selectSM} onChange={e => setSelectSM(e.target.value)} className='selectField' >
                                        <option selected disabled>Semestre</option>
                                        <option value="1">1º Semeste</option>
                                        <option value="2">2º Semeste</option>
                                        <option value="3">3º Semeste</option>
                                        <option value="4">4º Semeste</option>
                                        <option value="5">5º Semeste</option>
                                        <option value="6">6º Semeste</option>
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
                            <button type='submit'>Cadastrar</button>
                            {erro && <div className="erroCad">{erro}</div>}
                            {mensagem && <div className="cadSucess">{mensagem}</div>}
                        </form>
                    </section>
                </section>
            </menu>
            <Footer />
        </React.Fragment>
    )
}

export default CadComp
