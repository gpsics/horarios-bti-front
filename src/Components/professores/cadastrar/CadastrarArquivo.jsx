import React from 'react'
import NomeProfessores from '../cadastrar/professores.csv'

const parseCSV = (text) => {

    return text.split('\n')
}
const CadastrarArquivo = () => {
    const [csv, setCsv] = useState([])
    useEffect(() => {
        fetch(NomeProfessores)
            .then((r) => r.text())
            .then((text) => {
                setCsv(parseCSV(text))
            });
        }, []);
    const enviarProfs = (csv) => {
        adicionarProf(csv)
    }
  return (
    <>
      <h1>Upload de arquivo CSV</h1>
      <button onClick={() => enviarProfs(csv)}>enviar</button>
    </>
  )
}

export default CadastrarArquivo
