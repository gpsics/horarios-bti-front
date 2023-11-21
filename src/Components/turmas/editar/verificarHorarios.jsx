const verificarHorario = (arrayTable, horariosSet, setHorariosMarcados) => {
    const horariosIguais = arrayTable.filter((element) =>
        Array.from(horariosSet).some(
            (chave) =>
                parseInt(chave.charAt(0)) === element.dia &&
                chave.charAt(1) === element.turno &&
                parseInt(chave.charAt(2)) === element.hora
        )
    );

    setHorariosMarcados(new Set(horariosIguais.map((horario) => `${horario.dia}${horario.turno}${horario.hora}`)));
};

export default verificarHorario;
