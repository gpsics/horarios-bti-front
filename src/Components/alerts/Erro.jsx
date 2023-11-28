import Swal from "sweetalert2"

const Erro = {
    erro: (motivo) => {
        return Swal.fire(
            'Oops...',
            `${motivo}`,
            'error',
        );
    },
};

export default Erro
