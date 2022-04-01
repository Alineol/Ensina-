import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import App from '../App';
import testData from '../testData';
// mockar cada retorno da api.

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData),
    }));
};

describe('Testa a Barra de Pesquisa', () => {
  beforeAll(mockFetch);
  it('Realize uma requisição para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('verifica se os radio buttons de filtro estão presentes na tela', async () => {
    await act(async () => {
      render(<App />);
    });
    const ingredientFilter = screen.getByTestId('search-input');
    expect(ingredientFilter).toBeInTheDocument();
  });
});
