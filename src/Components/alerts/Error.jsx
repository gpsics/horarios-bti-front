import Swal from "sweetalert2"


const Error = {
    erro: (motivo) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`Falha ao realizar esta operação devido ${motivo}!`,
        })
    }
}

export default Error
