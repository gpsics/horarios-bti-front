import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from '../login/Login';
import "@testing-library/jest-dom"

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))

describe("Login", () => {
    it("should render correctly", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Usuário")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
        expect(screen.getByText("ENTRAR")).toBeInTheDocument();
    });

    it("should call navigate when the button is clicked", () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Certifique-se de encontrar o botão "ENTRAR" corretamente 
        const btnEntrar = screen.getByText("ENTRAR");
        expect(btnEntrar).toBeInTheDocument();

        // Dispare o evento de clique no botão "ENTRAR"
        fireEvent.click(btnEntrar);

        // Verifique se a função navigate foi chamada corretamente
        expect(mockNavigate).toHaveBeenCalledWith("/Home");
    })
});
