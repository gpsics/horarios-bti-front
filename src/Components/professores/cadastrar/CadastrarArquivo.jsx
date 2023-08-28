import React, { useState } from 'react';
import './CadastrarArquivo.css'
const parseCSV = (text) => text.split('\n');

const CadastrarArquivo = () => {
  const [csv, setCsv] = useState([]);
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')
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
    const token = localStorage.getItem('token');
    if (!token) {
      setErro('Você precisa estar logado para cadastrar um arquivo.');
      return;
    }

    const url = 'http://127.0.0.1:8000/professores/'
    try {
      for (const nome of csv) {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ nome_prof: nome }),
        };

        const response = await fetch(url, requestOptions);

        if (response.ok) {
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
        <button onClick={fileSubmit}>Cadastrar Arquivo </button>
        {erro && <div className="erroCad">{erro}</div>}
        {mensagem && <div className="cadSucess">{mensagem}</div>}
      </div>
    </>
  );
};

export default CadastrarArquivo;