const handleHorarioSelecionado = (event, maxCheckeds, horariosMarcados, setHorariosMarcados) => {
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

export default handleHorarioSelecionado;
