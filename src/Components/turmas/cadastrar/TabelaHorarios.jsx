import React, { useEffect, useState } from 'react'
import './TabelaHorario.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useDocentes } from './DocentesContext';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import Menu from '../../menuLateral/Menu';
import Erro from '../../alerts/Erro';
import Confirm from '../../alerts/Confirm';
import Sucess from '../../alerts/Sucess';
import axios from 'axios';
import { useAuth } from '../../../provider/authProvider';


const horariosColuna = [
    { Horario: '07:00 - 07:55' },
    { Horario: '07:55 - 08:50' },
    { Horario: '08:50 - 09:45' },
    { Horario: '09:55 - 10:50' },
    { Horario: '10:50 - 11:45' },
    { Horario: '11:45 - 12:40' },
    { Horario: '13:00 - 13:55' },
    { Horario: '13:55 - 14:50' },
    { Horario: '14:50 - 15:45' },
    { Horario: '15:55 - 16:50' },
    { Horario: '16:50 - 17:45' },
    { Horario: '17:45 - 18:40' },
    { Horario: '18:50 - 19:45' },
    { Horario: '19:45 - 20:40' },
    { Horario: '20:40 - 21:35' },
    { Horario: '21:35 - 22:30' },

]
const arrayTable = [];
for (let diaSemana = 2; diaSemana < 7; diaSemana++) {
    for (let horaDia = 1; horaDia <= 6; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'M',
            hora: horaDia,
        });
    }
    for (let horaDia = 1; horaDia <= 6; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'T',
            hora: horaDia,
        });
    }
    for (let horaDia = 1; horaDia <= 4; horaDia++) {
        arrayTable.push({
            dia: diaSemana,
            turno: 'N',
            hora: horaDia,
        });
    }
}

const TabelaHorarios = () => {
    const [horariosMarcados, setHorariosMarcados] = useState(new Set());
    const [componente, setComponente] = useState([])
    const [iguais, setIguais] = useState([])
    const [maxCheckeds, setMaxCheckeds] = useState(1)
    const diaSegunda = arrayTable.filter(item => item.dia === 2);
    const diaTerca = arrayTable.filter(item => item.dia === 3);
    const diaQuarta = arrayTable.filter(item => item.dia === 4);
    const diaQuinta = arrayTable.filter(item => item.dia === 5);
    const diaSexta = arrayTable.filter(item => item.dia === 6);
    const { codComp, numTurma, numVagas } = useParams()
    const { docentesSelecionados } = useDocentes()
    const { token } = useAuth()

    const navigate = useNavigate();
    const cancelar = () => {
        Confirm.cancel().then(async (result) => {
            if (result.isConfirmed) {
                navigate('/home')
            }
        })
    }

    const cadastrarTurma = async (e) => {
        e.preventDefault()
        Confirm.cadastrar().then(async (result) => {
            if (result.isConfirmed) {

                if (horariosMarcados.size === 0) {
                    Erro.erro('Você precisa selecionar algum horário na tabela!')
                    return
                }
                if (horariosMarcados.size < maxCheckeds) {
                    Erro.erro(`Escolha ${maxCheckeds} horários na tabela, totalizando ${maxCheckeds * 15} horas!`)
                    return
                }
                const url = 'http://127.0.0.1:8000/api/turmas/'
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const data = {
                    cod_componente: componente.codigo,
                    num_turma: numTurma,
                    horario: Array.from(horariosMarcados).join(' '),
                    num_vagas: numVagas,
                    professor: docentesSelecionados.map(professor => professor.id)
                }

                try {
                    const response = await axios.post(url, data, config);
                    if (response.status === 201) {
                        Sucess.cadastro()
                        navigate(-1)
                    } else {
                        Erro.erro('Erro ao cadastrar turma!')
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        })
    }

    // Nesta função, irá acontecer uma verificação de se pelo menos um elemento do array 'newArray' atende as condições dentro do método .some() para assim marcar como horário igual ao da tabela e la na tabela, marccar com um X
    const verificarHorario = (horariosSet) => {
        setIguais((prevIguais) => {
            // Use a Set to keep track of unique values
            const uniqueIguaisSet = new Set(prevIguais);

            // Add new values to the Set
            arrayTable.forEach((element) => {
                if (Array.from(horariosSet).some(
                    (chave) =>
                        parseInt(chave.charAt(0)) === element.dia &&
                        chave.charAt(1) === element.turno &&
                        parseInt(chave.charAt(2)) === element.hora
                )) {
                    uniqueIguaisSet.add(element);
                }
            });

            // Convert the Set back to an array
            const uniqueIguaisArray = Array.from(uniqueIguaisSet);

            return uniqueIguaisArray;
        });
    };


    const handleHorarioSelecionado = (event) => {
        const horarioSelecionado = event.target.value;
        setHorariosMarcados((prevHorarios) => {
            const newHorarios = new Set(prevHorarios);

            if (newHorarios.has(horarioSelecionado)) {
                newHorarios.delete(horarioSelecionado);
            } else if (newHorarios.size < maxCheckeds) {
                // Verifica se atingiu o máximo antes de adicionar
                newHorarios.add(horarioSelecionado);
            }

            return newHorarios;
        });
    };

    const lerHorariosTurmas = async (identificador, tipo) => {
        let url = ''
        if (tipo) {
            url = `http://127.0.0.1:8000/api/horarios/semestre/${identificador}`;
        } else if (!tipo) {
            url = `http://127.0.0.1:8000/api/horarios/professores/${identificador}`;
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            // Esta função vai ler o horario passado  independente do tamanho e da quantidade de horarios que tiver na string "23M45" ou "234N23 56T34", vai tratar os dados, separando-os em combinações de 3 caracteres "2M4" sem repetições e vai salvalos em um array
            if (response.status === 200) {
                const componentesData = response.data
                const horariosSet = new Set();
                componentesData.forEach((item, index) => {
                    // continuar a processar os horários contidos em item.horario
                    const horarioInformado = item.horario;
                    if (horarioInformado && typeof horarioInformado === 'string') {
                        horarioInformado.split(' ').forEach((horarioss) => {
                            const horarios = horarioss.split(' ');
                            horarios.forEach((horario) => {
                                const match = horario.match(/^(\d+)([MTN])(\d+)$/);
                                if (match) {
                                    const diaSemana = match[1].split('').map((dia) => parseInt(dia));
                                    const turno = match[2];
                                    const horario = match[3].split('').map((hora) => parseInt(hora));
                                    diaSemana.forEach((dia) => {
                                        horario.forEach((hora) => {
                                            const chave = `${dia}${turno}${hora}`;
                                            horariosSet.add(chave);
                                        });
                                    });
                                } else {
                                    console.log('Nao tem match nos horarios!')
                                }
                            });
                        })
                    } else {
                        console.log(`A turma ${index + 1} não possue horários informados!`)
                    }
                });
                if (horariosSet.size > 0) {
                    verificarHorario(horariosSet);
                }
            } else {
                console.log(`Erro ao listar os horários das turmas!`)
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const calcularMaxCheckeds = (cargaHoraria) => {
        // Essa funcao vai retornar o maximo de checkbox que podem ser marcados na tabela de acordo com a carga horária do componente.
        if (cargaHoraria <= 90) {
            return Math.ceil(cargaHoraria / 15);
        }
        return 6; // Valor máximo
    };

    const requisitarComponente = async () => {
        // eslint-disable-next-line
        // Esta função vai requisitar o componente curricular com base no codigo informado pelo usuario e assim vai fazer a verifição da carga horaria e do numero do semestre do mesmo para assim definir o maximo de checkbox que podem ser marcados na tabela e também os horários já ocupados pelas turmas do semestre.

        const url = `http://127.0.0.1:8000/api/componentes/${codComp.toUpperCase()}`;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await axios.get(url, config);
            if (response.status === 200) {
                const componentesData = response.data
                setComponente(componentesData)
                const novoNumSemestre = componentesData.num_semestre;

                const maxCheckeds = calcularMaxCheckeds(componentesData.carga_horaria);
                setMaxCheckeds(maxCheckeds);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const tipo = true
                lerHorariosTurmas(novoNumSemestre, tipo)

            } else {
                Erro.erro('Erro ao listar componentes!')
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    };
    const requisitarDocentes = async () => {
        for (const professor of docentesSelecionados) {
            const tipo = false;
            lerHorariosTurmas(professor.id, tipo);
        }
    };


    useEffect(() => {
        requisitarComponente();
        requisitarDocentes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <React.Fragment>
            <Header titulo = {'Tabela de Horários'} link={'/Home'} />
            <main id='entidades'>
                <div id="menu">
                    <Menu />
                </div>

                <section className="conteudo tableCadTur">
                    <table className="padraoTabelas tableHor">
                        <thead>
                            <tr>
                                <th id="pontaEsquerda" className='colunaHorarios'>HORÁRIOS</th>
                                <th className='colunaDias'>SEG</th>
                                <th className='colunaDias'>TER</th>
                                <th className='colunaDias'>QUA</th>
                                <th className='colunaDias'>QUI</th>
                                <th id='pontaDireita' className='colunaDias'>SEX</th>
                            </tr>
                        </thead>
                        <tbody>
                            {horariosColuna.map((horario, index) => (
                                <tr key={index}>
                                    <td className='colunaHorarios'>{horario.Horario}</td>
                                    <td className='colunaDias'>
                                        {/* Caso pelo menos um indice do array 'diaSegunda' atenda as condições do metodo .some(), irá imprimir na tela um X */}
                                        {diaSegunda[index] && (
                                            iguais.some(
                                                (item) =>
                                                    item.dia === diaSegunda[index].dia &&
                                                    item.turno === diaSegunda[index].turno &&
                                                    item.hora === diaSegunda[index].hora
                                            )
                                                ? 'X'
                                                : ''
                                        )}
                                        {/* Passa os valores do objeto horário selecionado */}
                                        <input
                                            type="checkbox"
                                            value={`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`}
                                            onChange={handleHorarioSelecionado}
                                            checked={Array.from(horariosMarcados).includes(`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`)}
                                            disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${diaSegunda[index].dia}${diaSegunda[index].turno}${diaSegunda[index].hora}`)}
                                        />
                                    </td>
                                    <td className='colunaDias'>
                                        {diaTerca[index] && (
                                            iguais.some(
                                                (item) =>
                                                    item.dia === diaTerca[index].dia &&
                                                    item.turno === diaTerca[index].turno &&
                                                    item.hora === diaTerca[index].hora
                                            )
                                                ? 'X'
                                                : ''
                                        )}
                                        <input
                                            type="checkbox"
                                            value={`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`}
                                            onChange={handleHorarioSelecionado}
                                            checked={Array.from(horariosMarcados).includes(`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`)}
                                            disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${diaTerca[index].dia}${diaTerca[index].turno}${diaTerca[index].hora}`)}
                                        />
                                    </td>
                                    <td className='colunaDias'>
                                        {diaQuarta[index] && (
                                            iguais.some(
                                                (item) =>
                                                    item.dia === diaQuarta[index].dia &&
                                                    item.turno === diaQuarta[index].turno &&
                                                    item.hora === diaQuarta[index].hora
                                            )
                                                ? 'X'
                                                : ''
                                        )}
                                        <input
                                            type="checkbox"
                                            value={`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`}
                                            onChange={handleHorarioSelecionado}
                                            checked={Array.from(horariosMarcados).includes(`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`)}
                                            disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${diaQuarta[index].dia}${diaQuarta[index].turno}${diaQuarta[index].hora}`)}
                                        />
                                    </td>
                                    <td className='colunaDias'>
                                        {diaQuinta[index] && (
                                            iguais.some(
                                                (item) =>
                                                    item.dia === diaQuinta[index].dia &&
                                                    item.turno === diaQuinta[index].turno &&
                                                    item.hora === diaQuinta[index].hora
                                            )
                                                ? 'X'
                                                : ''
                                        )}
                                        <input
                                            type="checkbox"
                                            value={`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`}
                                            onChange={handleHorarioSelecionado}
                                            checked={Array.from(horariosMarcados).includes(`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`)}
                                            disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${diaQuinta[index].dia}${diaQuinta[index].turno}${diaQuinta[index].hora}`)}
                                        />
                                    </td>
                                    <td className='colunaDias'>
                                        {diaSexta[index] && (
                                            iguais.some(
                                                (item) =>
                                                    item.dia === diaSexta[index].dia &&
                                                    item.turno === diaSexta[index].turno &&
                                                    item.hora === diaSexta[index].hora
                                            )
                                                ? 'X'
                                                : ''
                                        )}
                                        <input
                                            type="checkbox"
                                            value={`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`}
                                            onChange={handleHorarioSelecionado}
                                            checked={Array.from(horariosMarcados).includes(`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`)}
                                            disabled={horariosMarcados.size >= maxCheckeds && !horariosMarcados.has(`${diaSexta[index].dia}${diaSexta[index].turno}${diaSexta[index].hora}`)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="opcoesCadastro">
                        <button id='cancel' className="botoesCad" onClick={cancelar}>Cancelar</button>
                        <button id='cad' className="botoesCad" onClick={cadastrarTurma}>Cadastrar</button>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default TabelaHorarios
