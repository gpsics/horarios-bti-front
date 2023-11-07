import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Pilot from "../Components/pilot/Pilot";
import Login from "../Components/login/Login";
import Home from "../Components/home/Home";
import CadastrarProfessor from "../Components/professores/cadastrar/CadastrarProfessor";
import EditarProfessor from "../Components/professores/editar/EditarProfessor";
import ListarProfessores from "../Components/professores/listar/ListarProfessores";
import CadastrarTurma from "../Components/turmas/cadastrar/CadastrarTurma";
import TabelaHorarios from "../Components/turmas/cadastrar/TabelaHorarios";
import ListarTurmas from "../Components/turmas/listagem/ListarTurmas";
import ListarTurmasSemestre from "../Components/turmas/listagem/ListarTurmasSemestre";
import ListarTurmasProfessor from "../Components/turmas/listagem/ListarTurmasProfessor";
import ListarTurmasComponente from "../Components/turmas/listagem/ListarTurmasComponente";
import ListarTurmasConflito from "../Components/turmas/listagem/ListarTurmasConflito";
import DadosTurma from "../Components/turmas/dados/DadosTurma";
import CadComp from "../Components/componentes/cadastro/CadComp";
import ListarComponentes from "../Components/componentes/listar/ListarComponentes";
import Dados from "../Components/componentes/dados/Dados";
import EditarComponente from "../Components/componentes/editar/EditarComponente";

const Routes = () => {
    const { token } = useAuth();

    // Rotas acessiveis a todos os usuários
    const routesForPublic = [
        { path: "/", element: <Pilot />, },
        { path: "*", element: <Pilot />, },
        { path: "/Login", element: <Login />, },
    ];

    // Rotas acessiveis apenas para usuários autenticados

    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                { path: "Home", element: <Home />, },

                // Rotas para professor 
                { path: "professores/cadastrarProfessor", element: <CadastrarProfessor />, },
                { path: "professores/editarProfessor/:idProf", element: <EditarProfessor />, },
                { path: "professores/listarProfessores", element: <ListarProfessores />, },


                // Rotas para turmas
                { path: "turmas/cadastrarTurma", element: <CadastrarTurma />, },
                { path: "turmas/cadastrarTurma/horarios/:codComp/:numTurma/:numVagas", element: <TabelaHorarios />, },
                { path: "turmas/listarTurmas", element: <ListarTurmas /> },
                { path: "turmas/listarTurmas/semestre", element: <ListarTurmasSemestre />, },
                { path: "turmas/listarTurmas/professor", element: <ListarTurmasProfessor />, },
                { path: "turmas/listarTurmas/componente", element: <ListarTurmasComponente />, },
                { path: "turmas/listarTurmas/conflito", element: <ListarTurmasConflito />, },
                { path: "turmas/verDadosTurma/:idTurma", element: <DadosTurma />, },

                // Rotas para componente curricular
                { path: "componentes/cadastrarComponente", element: <CadComp />, },
                { path: "/componentes/listarComponentes", element: <ListarComponentes />, },
                { path: "/componentes/verDadosComponente/:idComp", element: <Dados />, },
                { path: "/componentes/editarComponente/:idComp", element: <EditarComponente />, },
            ]
        }
    ];

    // Rotas acessiveis para usuários não autenticados

    const routesForNotAuthenticatedOnly = [
        { path: "/", element: <Pilot />, },
        { path: "*", element: <Pilot />, },
        { path: "/Login", element: <Login />, },
    ]

    // combinar condições de rotas com base nos status de autenticação
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;