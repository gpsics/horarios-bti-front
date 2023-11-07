import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as PiIcons from 'react-icons/pi'
import * as SiIcons from 'react-icons/si'
import * as MdIcons from 'react-icons/md'
import * as LuIcons from 'react-icons/lu'

export const MenuData = [
    {
        title: 'Professores',
        path: '/professores',
        icon: <AiIcons.AiOutlineUser/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title: 'Cadastrar Professor',
                path: '/professores/cadastrarProfessor',
                icon: <AiIcons.AiOutlineUserAdd/>
            },
            {
                title: 'Listar Professores',
                path: '/professores/listarProfessores',
                icon: <PiIcons.PiUserListFill/>
            },
        ]
    },
    {
        title: 'Turmas',
        path: '/turmas',
        icon: <SiIcons.SiGoogleclassroom/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title: 'Cadastrar Turma',
                path: '/turmas/cadastrarTurma',
                icon: <MdIcons.MdGroupAdd/>
            },
            {
                title: 'Listar Turmas',
                path: '/turmas/listarTurmas',
                icon: <PiIcons.PiUserListFill/>
            },
            {
                title: 'Listar Turmas por Semestre',
                path: '/turmas/listarTurmas/semestre',
                icon: <FaIcons.FaListAlt/>
            },
            {
                title: 'Listar Turmas por Professor',
                path: '/turmas/listarTurmas/professor',
                icon: <FaIcons.FaListAlt/>
            },
            {
                title: 'Listar Turmas por Componente',
                path: '/turmas/listarTurmas/componente',
                icon: <FaIcons.FaListAlt/>
            },
            {
                title: 'Listar Turmas com Conflito',
                path: '/turmas/listarTurmas/conflito',
                icon: <FaIcons.FaListAlt/>
            },
        ]
    },
    {
        title: 'Componentes',
        path: '/componentes',
        icon: <LuIcons.LuComponent/>,
        iconClosed: <RiIcons.RiArrowDownSFill/>,
        iconOpened: <RiIcons.RiArrowUpSFill/>,
        subNav:[
            {
                title: 'Cadastrar Componente',
                path: '/componentes/cadastrarComponente',
                icon: <MdIcons.MdLibraryAdd/>
            },
            {
                title: 'Listar Componentes',
                path: '/componentes/listarComponentes',
                icon: <FaIcons.FaListAlt/>
            },
        ]
    }
]
