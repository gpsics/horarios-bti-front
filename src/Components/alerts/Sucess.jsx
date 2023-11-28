import Swal from 'sweetalert2';

const Sucess = {
    cadastro: () => {
        return Swal.fire(
            'Cadastrado!',
            'A operação de cadastro bem sucedida!',
            'success'
        )
    },
    cadastroArquivo: () => {
        return Swal.fire(
            'Arquivo Cadastrado!',
            'Todos os professores do arquivo foram cadastrados com sucesso!',
            'success'
        )
    },
    cadastroProfs: (profs) => {
        return Swal.fire(
            'Resultado do Cadastro!',
            `${profs}`,
            'info'
        )
    },
    delete: () => {
        return Swal.fire(
            'Deletado!',
            'A operação de exclusão foi realizada com sucesso.',
            'success'
        )
    },
    editado: () => {
        return Swal.fire(
            'Atualizado!',
            'A operação de atualização dos dados foi realizada com sucesso.',
            'success'
        )
    }
};


export default Sucess
