import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

const correctEmail = 'usuario@123.com';
const emailInput = () => screen.getByTestId('email-input');
const passwordInput = () => screen.getByTestId('password-input');

describe('1-Verifica validações na tela de login', () => {
  it('1- testa se ao renderizar a tela o botão de login esta desativado', () => {
    renderWithRouter(<Login />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('2-Ao digitar email e senha corretamente o botão de login fica desativado', () => {
    renderWithRouter(<Login />);
    const inputEmail = emailInput();
    const inputPassword = passwordInput();
    userEvent.type(inputEmail, correctEmail);
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });
  it('3-Ao digitar email e senha errados, o botão de login fica desativado', () => {
    renderWithRouter(<Login />);
    const inputEmail = emailInput();
    const inputPassword = passwordInput();
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
    userEvent.type(inputEmail, correctEmail);
    userEvent.type(inputPassword, '123456');
    expect(button).toBeDisabled();
  });
});
describe('2-Verifica informmações no local Storage', () => {
  it('4-testa se os tokens são salvos no localSotrage', () => {
    renderWithRouter(<Login />);
    const storage = localStorage.getItem('mealsToken');
    const storage2 = localStorage.getItem('cocktailsToken');
    expect(storage && storage2).toBeNull();
    const inputEmail = emailInput();
    const inputPassword = passwordInput();
    userEvent.type(inputEmail, correctEmail);
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const newStorage = localStorage.getItem('mealsToken');
    const newStorage2 = localStorage.getItem('cocktailsToken');
    expect(newStorage && newStorage2).toBe('1');
  });
  it('5-testa se o email do usuario é salvo na chave "user"', () => {
    renderWithRouter(<Login />);
    const inputEmail = emailInput();
    const inputPassword = passwordInput();
    userEvent.type(inputEmail, correctEmail);
    userEvent.type(inputPassword, '1234567');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toStrictEqual({ email: correctEmail });
  });
});
