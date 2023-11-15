import React, { useState } from 'react';
import './CadastrarArquivo.css'
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';
const parseCSV = (text) => text.split('\n');

const CadastrarArquivo = () => {
  const [csv, setCsv] = useState([]);
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
  const {token} = useAuth()
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
    setErro('')
    setMensagem('')

    const url = 'http://127.0.0.1:8000/api/professores/'
    try {
      for (const nome of csv) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = {
          nome_prof: nome
        }
        const response = await axios.post(url, data, config);
        if (response.status === 201) {
          setMensagem('Professor cadastrado com sucesso!');
        } else {
          const data = await response.json();
          setErro('Erro ao cadastrar professor: ' + data.detail);
        }
      }
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <>
      <h3>Cadastrar Multiplos</h3>
      <div className="cadastroArquivo">
        <input type="file" accept=".csv" onChange={handleOnChange} className="custom-file-input" />
        <div className="footerCadArq">
          <button onClick={fileSubmit} className='botaoCadastrar'>Cadastrar Arquivo </button>
          {erro && <div className="erroCad">{erro}</div>}
          {mensagem && <div className="cadSucess">{mensagem}</div>}
        </div>
      </div>
    </>
  );
};

export default CadastrarArquivo;