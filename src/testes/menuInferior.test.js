import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import MenuInferior from '../components/MenuInferior';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';
import Profile from '../pages/Profile';
import ExploreFoodsByNationality from '../pages/ExploreFoodsByNationality';
import ExploreDrinksByIngredient from '../pages/ExploreDrinksByIngredient';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import Explore from '../pages/Explore';
import ExploreFoodsByIngredient from '../pages/ExploreFoodsByIngredient';

const ID_DRINKS = 'drinks-bottom-btn';
const ID_EXPLORE = 'explore-bottom-btn';
const ID_FOOD = 'food-bottom-btn';
const ID_FOOTER = 'footer';

// afterEach(cleanup);

describe('Verifica validações na tela de Menu Inferior', () => {
  it('Tem data-testids footer/drinks-bottom-btn/explore-bottom-btn e food-bottom-btn',
    () => {
      // teste 19

      renderWithRouter(<MenuInferior />);
      const dreinksBottom = screen.getByTestId(ID_DRINKS);
      const exploreBottom = screen.getByTestId(ID_EXPLORE);
      const foodBottom = screen.getByTestId(ID_FOOD);
      const footer = screen.getByTestId(ID_FOOTER);

      expect(dreinksBottom && exploreBottom && foodBottom && footer).toBeInTheDocument();
    });

  it('Menu inferior deve estar fixado no final da pagina e com icones corretos',
    () => {
      // teste 20

      renderWithRouter(<MenuInferior />);

      const footer = screen.getByTestId('footer');
      expect(footer.style.position).toBe('fixed');
      expect(footer.style.bottom).toBe('0px');

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

  it('Tem footer na tela de principal de receitas de comidas',
    () => {
      // teste 21

      renderWithRouter(<Foods />);
      const footer = screen.getByTestId(ID_FOOTER);
      expect(footer).toBeInTheDocument();
    });

  it('Tem footer na tela de explorar', () => {
    // teste 21

    renderWithRouter(<Explore />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas', () => {
    // teste 21

    renderWithRouter(<ExploreFoods />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas', () => {
    // teste 21

    renderWithRouter(<ExploreDrinks />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    // teste 21

    renderWithRouter(<ExploreFoodsByIngredient />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    // teste 21

    renderWithRouter(<ExploreDrinksByIngredient />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de explorar comidas por nacionalidade', () => {
    // teste 21

    renderWithRouter(<ExploreFoodsByNationality />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Tem footer na tela de perfil', () => {
    // teste 21

    renderWithRouter(<Profile />);
    const footer = screen.getByTestId(ID_FOOTER);
    expect(footer).toBeInTheDocument();
  });

  it('Redirezar o usuário para lista de cocktails ao clicar no ícone de bebidas',
    () => {
      // teste 22

      const { history } = renderWithRouter(<MenuInferior />);

      const drinks = screen.getByTestId(ID_DRINKS);
      fireEvent.click(drinks);
      expect(history.location.pathname).toBe('/drinks');
    });

  it('Redirezar o usuário para lista de exploração ao clicar no ícone de explore',
    () => {
      // teste 23

      const { history } = renderWithRouter(<MenuInferior />);

      const explore = screen.getByTestId(ID_EXPLORE);
      fireEvent.click(explore);
      expect(history.location.pathname).toBe('/explore');
    });
  it(' Redirezar o usuário para lista de comidas ao clicar no ícone de Food',
    () => {
      // teste 24

      const { history } = renderWithRouter(<MenuInferior />);

      const foods = screen.getByTestId(ID_FOOD);
      fireEvent.click(foods);
      expect(history.location.pathname).toBe('/foods');
    });
});

// https://keyholesoftware.com/2020/11/30/using-jest-and-testing-library-with-react-native-part-v-styles-testing/
