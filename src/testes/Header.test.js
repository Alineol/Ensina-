import React from 'react';
// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe.skip('Testando o componente Header', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se tem os data-testids exigidos', () => {});

  it('Testa se o Header é exibido somente nas páginas requeridas', () => {});

  it('Teste se o clique no botão de perfil redireciona para a tela de perfil', () => {});

  it('Teste se o clique no botão de busca exibe e depois esconde a searchBar', () => {});
});
