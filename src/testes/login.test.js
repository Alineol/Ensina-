import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

describe('Verifica validações na tela de login', () => {
  it('testa se ao renderizar a tela o botão de login esta desativado', () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('Ao digitar o email e a senha corretamente o botão de login fica desativado', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputEmail, 'usuario@123.com');
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
  it('Ao digitar email  senha incorretamente, o botão de login fica desativado', () => {
    renderWithRouter(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputEmail, 'usuario@123');
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'usuario123.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, '@123.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'usuario@123.com');
    userEvent.type(inputPassword, '123456');
    expect(button).toBeDisabled();
  });
});
describe('Verifica se renderiza a tela de principal de receitas ao fazer login', () => {

});
