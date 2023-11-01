import Swal from "sweetalert2"


const Error = {
    erro: (motivo) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:`${motivo}!`,
        })
    }
}

export default Error
