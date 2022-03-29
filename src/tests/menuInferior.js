import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './rederWithRouter';
import MenuInferior from '../components/MenuInferior';

describe('Verifica validações na tela de Menu Inferior', () => {
  it('19- Tem data-testids footer/drinks-bottom-btn/explore-bottom-btn e food-bottom-btn',
    () => {
      renderWithRouter(<MenuInferior />);
      const dreinksBottom = screen.getByTestId('drinks-bottom-btn');
      const exploreBottom = screen.getByTestId('explore-bottom-btn');
      const foodBottom = screen.getByTestId('food-bottom-btn');
      const footer = screen.getByTestId('footer');

      expect(dreinksBottom && exploreBottom && foodBottom && footer).toBeInTheDocument();
    });
});
