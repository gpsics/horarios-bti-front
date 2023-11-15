import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Menu from '../../menuLateral/Menu'
import Footer from '../../footer/Footer'
import '../cadastro/CadComp.css'
import Sucess from '../../alerts/Sucess'
import Confirm from '../../alerts/Confirm'
import { useAuth } from '../../../provider/authProvider'
import axios from 'axios'
import Error from '../../alerts/Error'

const EditarComponente = () => {
  const { idComp } = useParams();
  const [newName, setNewName] = useState('');
  const [newSemester, setNewSemester] = useState('');
  const [newCH, setNewCH] = useState('');
  const [newDP, setNewDP] = useState('');
  const [newChecked, setNewChecked] = useState(false);
  const {token} = useAuth()
  const navigate = useNavigate()

  const cancelar = () => {
    Confirm.cancel().then(async (result) => {
      if (result.isConfirmed) {
        navigate(-1)
      }
    })
  }
  const updateComponente = async (e) => {
    e.preventDefault();
    Confirm.editar().then(async (result) => {
      if (result.isConfirmed) {
        const url = `http://127.0.0.1:8000/api/componentes/${idComp}/`;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const data = {
          nome_comp: newName,
          num_semestre: newSemester,
          carga_horaria: newCH,
          departamento: newDP,
          obrigatorio: newChecked,
        }

        try {
          const response = await axios.put(url, data, config);
          if (response.status === 200) {
            Sucess.editado();
            fetchComponente()
          } else {

            Error.erro('Erro ao editar componente.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    });
  };

  const fetchComponente = useCallback(async () => {

    const Token = localStorage.getItem('token');
    const url = `http://127.0.0.1:8000/api/componentes/${idComp}`;
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    try {
      const response = await axios.get(url, config);
      if (response.status === 200) {
        const componentesData = response.data

        setNewName(componentesData.nome_comp);
        setNewSemester(componentesData.num_semestre);
        setNewCH(componentesData.carga_horaria);
        setNewDP(componentesData.departamento);
        setNewChecked(componentesData.obrigatorio);
      } else {
        console.log('Erro ao listar componentes.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }, [idComp]);

  useEffect(() => {
    fetchComponente();
  }, [fetchComponente]);
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
                    <input type="checkbox" placeholder='Obrigatório' checked={newChecked} onChange={e => setNewChecked(e.target.checked)} />Obrigatório
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
            </form>
              <div className="footerCad">
                <button onClick={cancelar} id='cancel' className="botoesCad" >Cancelar</button>
                <button onClick={updateComponente} className="botoesCad" id='cad'>Editar</button>
              </div>
          </section>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default EditarComponente