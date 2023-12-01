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
import Erro from '../../alerts/Erro'

const EditarComponente = () => {
  const { idComp } = useParams();
  const [newName, setNewName] = useState('');
  const [newSemester, setNewSemester] = useState();
  const [newCH, setNewCH] = useState();
  const [newDP, setNewDP] = useState();
  const [newChecked, setNewChecked] = useState(false);
  const { token } = useAuth()
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
      const regex = /[!@#$%^&*(),.?":{}|<>]/;
      if (result.isConfirmed) {
        if (regex.test(newName)) {
          Erro.erro('Não é permitido cadastrar caracteres especiais.')
          return
        }
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
          const response = await axios.patch(url, data, config);
          if (response.status === 200) {
            Sucess.editado();
            fetchComponente()
          } else {

            Erro.erro('Erro ao editar componente.');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      }
    });
  };

  const fetchComponente = useCallback(async () => {

    const url = `http://127.0.0.1:8000/api/componentes/${idComp}/`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
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
  }, [idComp, token]);

  useEffect(() => {
    fetchComponente();
  }, [fetchComponente]);
  return (
    <React.Fragment>
      <Header titulo={'Editar Componente'} link={'/Home'} />
      <main id="entidades">
        <div id="menu"><Menu /></div>
        <section className="conteudo cadComp">
          <section className="formCadComp">
            <div className="header-section">
              <h2>Altere as Informações</h2>
              <p>Modifique as credenciais necessárias para alterar este componente.</p>
              <p>Nota: Não é permitido incluir caracteres especiais nos campos, ou deixar alguma informação em branco. Além disso, se o componente não for obrigatório, não é necessário informar o semestre.</p>
            </div>
            <form onSubmit={updateComponente} className='formContainer'>
              <div className="columnsFather">
                <div className="columnSon">
                  <label ><input type="text" placeholder='Nome do Componente' value={newName} onChange={e => setNewName(e.target.value)} className='inputField' /><span style={{ color: 'red' }}>*</span></label>
                  <label >
                    <select value={newSemester} onChange={e => setNewSemester(e.target.value)} className='selectField' >
                      <option selected disabled>Semestre</option>
                      <option value="1">1º Semeste</option>
                      <option value="2">2º Semeste</option>
                      <option value="3">3º Semeste</option>
                      <option value="4">4º Semeste</option>
                      <option value="5">5º Semeste</option>
                      <option value="6">6º Semeste</option>
                    </select>
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <label >
                    <input type="checkbox" placeholder='Obrigatório' checked={newChecked} onChange={e => setNewChecked(e.target.checked)} />Obrigatório
                  </label>
                </div>
                <div className="columnSon edColun">

                  <label >
                    <select value={newCH} onChange={e => setNewCH(e.target.value)} className='selectField'  >
                      <option selected disabled>Carga Horária</option>
                      <option value="15">15 Horas</option>
                      <option value="30">30 Horas</option>
                      <option value="45">45 Horas</option>
                      <option value="60">60 Horas</option>
                      <option value="75">75 Horas</option>
                      <option value="90">90 Horas</option>
                    </select><span style={{ color: 'red' }}>*</span>
                  </label>
                  <label>
                    <select value={newDP} onChange={e => setNewDP(e.target.value)} className='selectField' >
                      <option selected disabled>Departamento</option>
                      <option value="DECEN">DECEN</option>
                      <option value="DCSAH">DCSAH</option>
                      <option value="DETEC">DETEC</option>
                    </select>
                    <span style={{ color: 'red' }}>*</span>
                  </label>

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