const ConfirmDelete = {
    confirm: () => {
        return Swal.fire({
            title: 'Deseja Mesmo Excluir?',
            text: 'Confirmando a exclusão, os dados não podem ser recuperados.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085de',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, delete!',
        });
    }
};

export default ConfirmDelete;
