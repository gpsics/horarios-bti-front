import React, { useState } from 'react'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import '../cadastro/CadComp.css'
const EditarComponente = ({componente}) => {
  const [newName, setNewName] = useState(componente.nome_comp)
  const [newSemester, setNewSemester] = useState(componente.num_semestre)
  const [newCH, setNewCH] = useState(componente.carga_horaria)
  const [newDP, setNewDP] = useState(componente.departamento)
  const [newChecked, setNewChecked] = useState(componente.obrigatorio)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  console.log(componente)
  const updateComponente = async (e) => {
    e.preventDefault()
    setErro('')
    setMensagem('')
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para editar componente.');
      return;
    }

    const url = `http://127.0.0.1:8000/componentes/${componente.codigo}/`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        nome_comp: newName,
        num_semestre: newSemester,
        carga_horaria: newCH,
        departamento: newDP,
        obrigatorio: newChecked,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.ok) {
        setMensagem('componente editado com sucesso.');
      } else {
        const data = await response.json();
        setErro('Erro ao editar componente:', data.detail);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <React.Fragment>
      <Header link={'/Home'} />
      <main id="entidades">
        <div id="menu"><Menu /></div>
        <section className="conteudo cadComp">
          <h1>Editar Componente</h1>
          <section className="formCadComp">
            <form onSubmit={updateComponente} className='formContainer'>
              <div className="columnsFather">
                <div className="columnSon">

                  <input type="text" placeholder='Nome do Componente' value={newName} onChange={e => setNewName(e.target.value)} className='inputField' />
                  <select value={newSemester} onChange={e => setNewSemester(e.target.value)} className='selectField' >
                    <option selected disabled>Semestre</option>
                    <option value="1">1º Semeste</option>
                    <option value="2">2º Semeste</option>
                    <option value="3">3º Semeste</option>
                    <option value="4">4º Semeste</option>
                    <option value="5">5º Semeste</option>
                    <option value="6">6º Semeste</option>
                  </select>
                  <label >
                    <input type="checkbox" placeholder='Obrigatório' checked={newChecked} onChange={e => setNewChecked(e.target.checked)} />
                    Obrigatório
                  </label>
                </div>
                <div className="columnSon edColun">
                  
                  <select value={newCH} onChange={e => setNewCH(e.target.value)} className='selectField' id='ed1' >
                    <option selected disabled>Horas</option>
                    <option value="15">15 Horas</option>
                    <option value="30">30 Horas</option>
                    <option value="45">45 Horas</option>
                    <option value="60">60 Horas</option>
                    <option value="75">75 Horas</option>
                    <option value="90">90 Horas</option>
                  </select>
                  <select value={newDP} onChange={e => setNewDP(e.target.value)} className='selectField' id='ed2'>
                    <option selected disabled>Departamento</option>
                    <option value="DECEN">DECEN</option>
                    <option value="DCSAH">DCSAH</option>
                    <option value="DETEC">DETEC</option>
                  </select>
                  
                </div>
              </div>
              <div className="footerCad">
                <div>
                  {erro && <div className="erroCad">{erro}</div>}
                  {mensagem && <div className="cadSucess">{mensagem}</div>}
                </div>
                <button type='submit'>Cadastrar</button>
              </div>
            </form>
          </section>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default EditarComponente