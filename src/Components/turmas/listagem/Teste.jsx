import React, { useState } from 'react'

const Teste = () => {
    const [horarioInformado, setHorarioInformado] = useState('');
    const lerHorario = (event) => {
        event.preventDefault();
        console.log('Funcao chamada')
        // Define uma expressão regular para extrair as informações
        const regex = /^(\d+)([MTN])(\d+)$/;

        // Tenta fazer a correspondência da string com a expressão regular
        const match = horarioInformado.match(regex);

        if (match) {
            // match[1] contém os dias da semana
            const diaSemana = parseInt(match[1]);

            // match[2] contém o turno
            let turno;
            if (match[2] === 'M') {
                turno = 'Manhã';
            } else if (match[2] === 'T') {
                turno = 'Tarde';
            } else if (match[2] === 'N') {
                turno = 'Noite';
            }

            // match[3] contém os horários
            const horario = parseInt(match[3]);

            // Agora você pode usar essas informações como desejar
            console.log(`Dia da semana: ${diaSemana}`);
            console.log(`Turno: ${turno}`);
            console.log(`Horário: ${horario}`);
        } else {
            console.log('A string não corresponde ao padrão esperado.');
        }

    }
    return (
        <React.Fragment>
            <h2>Informe o horario</h2>
            <input type="text" placeholder='Horario' value={horarioInformado} onChange={e => setHorarioInformado(e.target.value)} className='input' />
            <button onClick={lerHorario}>Cadastrar</button>

        </React.Fragment>
    )
}

export default Teste
