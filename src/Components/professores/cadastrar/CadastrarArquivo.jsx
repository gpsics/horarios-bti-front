import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';
import imgCloud from '../../../imgs/cloud-upload.png';
import { FaTrash } from 'react-icons/fa';
import Sucess from '../../alerts/Sucess';
import Erro from '../../alerts/Erro';
import Confirm from '../../alerts/Confirm';

const parseCSV = (text) => text.split('\n');

const CadastrarArquivo = () => {
  const [csv, setCsv] = useState([]);
  const { token } = useAuth();

  const handleOnChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => setCsv(parseCSV(event.target.result));
      fileReader.readAsText(file);
    }
  };
  

  const fileSubmit = async (e) => {
    e.preventDefault();
    Confirm.cadastrar().then(async (result) => {
      if (result.isConfirmed) {
        if (csv.length === 0) {
          Erro.erro('Informe um arquivo!')
          return
        }

        const profsErro = new Set();
        const profsSucess = new Set();

        const url = 'http://127.0.0.1:8000/api/professores/';
        for (const nome of csv) {
          try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            };
            const data = {
              nome_prof: nome,
            };
            const response = await axios.post(url, data, config);

            if (response.status === 201) {
              profsSucess.add(nome);
            }
          } catch (error) {
            console.error(error);
            profsErro.add(nome);
          }
        }
        if (profsErro.size === 0 && profsSucess.size > 0) {
          Sucess.cadastroArquivo();
        } else if (profsErro.size > 0 && profsSucess.size > 0) {
          Sucess.cadastroProfs(`Os professores ${Array.from(profsSucess).join(', ')} foram cadastrados com sucesso! <br><br> Os professores ${Array.from(profsErro).join(', ')} já estavam cadastrados.`)

        } else if (profsErro.size > 0 && profsSucess.size === 0) {
          Erro.erro('Nenhum professor do arquivo foi cadastrado!');

        }

        profsSucess.clear();
        profsErro.clear();
        setCsv([]);
      }
    })
  };

  const removerDocente = (index) => {
    const novosDocentes = [...csv]
    novosDocentes.splice(index, 1)
    setCsv(novosDocentes)
  }

  return (
    <>
      <div className="header-section">
        <h2>Cadastrar Multiplos</h2>
        <p>Carregue o arquivo .csv que contenha os nomes dos professores que você deseja cadastrar.</p>
        <p>OBS: A organização do arquivo exige que cada linha contenha um nome de professor, sem a presença de vírgulas.</p>
      </div>
      <div className="drop-section">
        <div className="col">
          <div className="cloud-icon">
            <img src={imgCloud} alt="cloud" />
          </div>
          <label htmlFor="file-selector" className="file-selector">Procurar Arquivo<input type="file" id="file-selector" accept=".csv" onChange={handleOnChange} className="file-selector-input" /></label>
        </div>

      </div>
      <div className="list-section">
        <h3 className="list-title">Seu Arquivo</h3>
        <ul className="list">
          {csv.map((nome, index) => (
            <li key={index} className="in-prog">{nome}  <i onClick={() => removerDocente(index)}><FaTrash /></i></li>
          ))}
        </ul>
      </div>
      
        <div className="opcoesButtons">
          <button onClick={fileSubmit} className="botoesCad" id='cad'>
            Cadastrar Arquivo
          </button>

        </div>
    </>
  );
};

export default CadastrarArquivo;
