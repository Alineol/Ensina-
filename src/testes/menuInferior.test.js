import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import MenuInferior from '../components/MenuInferior';
import renderWithRouter from './renderWithRouter';

const ID_DRINKS = 'drinks-bottom-btn';
const ID_EXPLORE = 'explore-bottom-btn';
const ID_FOOD = 'food-bottom-btn';
const ID_FOOTER = 'footer';

// afterEach(cleanup);

describe('Verifica validações na tela de Menu Inferior', () => {
  it('19- Tem data-testids footer/drinks-bottom-btn/explore-bottom-btn e food-bottom-btn',
    () => {
      renderWithRouter(<MenuInferior />);
      const dreinksBottom = screen.getByTestId(ID_DRINKS);
      const exploreBottom = screen.getByTestId(ID_EXPLORE);
      const foodBottom = screen.getByTestId(ID_FOOD);
      const footer = screen.getByTestId(ID_FOOTER);

      expect(dreinksBottom && exploreBottom && foodBottom && footer).toBeInTheDocument();
    });

  it('20- Menu inferior deve estar fixado no final da pagina e com icones corretos',
    () => {
      renderWithRouter(<MenuInferior />);

      // const footer = screen.getByTestId('footer');
      // expect(footer).toHaveStyle('position: fixed');

      const drinks = screen.getByTestId(ID_DRINKS);
      expect(drinks).toHaveAttribute('src', 'drinkIcon.svg');
      expect(drinks).toHaveAttribute('alt', 'Drink');

      const explore = screen.getByTestId(ID_EXPLORE);
      expect(explore).toHaveAttribute('src', 'exploreIcon.svg');
      expect(explore).toHaveAttribute('alt', 'Explore');

      const foods = screen.getByTestId(ID_FOOD);
      expect(foods).toHaveAttribute('src', 'mealIcon.svg');
      expect(foods).toHaveAttribute('alt', 'Food');
    });

  it('22- Redirezar o usuário para lista de cocktails ao clicar no ícone de bebidas',
    () => {
      const { history } = renderWithRouter(<MenuInferior />);

      const drinks = screen.getByTestId(ID_DRINKS);
      fireEvent.click(drinks);
      expect(history.location.pathname).toBe('/drinks');
    });

  it('23- Redirezar o usuário para lista de exploração ao clicar no ícone de explore',
    () => {
      const { history } = renderWithRouter(<MenuInferior />);

      const explore = screen.getByTestId(ID_EXPLORE);
      fireEvent.click(explore);
      expect(history.location.pathname).toBe('/explore');
    });
  it('24- Redirezar o usuário para lista de comidas ao clicar no ícone de Food',
    () => {
      const { history } = renderWithRouter(<MenuInferior />);

      const foods = screen.getByTestId(ID_FOOD);
      fireEvent.click(foods);
      expect(history.location.pathname).toBe('/foods');
    });
});
