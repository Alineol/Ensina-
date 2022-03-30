import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import Login from '../pages/Login';
// import Foods from '../pages/Foods';
import FoodDetails from '../pages/FoodDetails';
import FoodInProgress from '../pages/FoodInProgress';
// import Drinks from '../pages/Drinks';
import DrinkDetails from '../pages/DrinkDetails';
import DrinkInProgress from '../pages/DrinkInProgress';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinksByIngredient from '../pages/ExploreDrinksByIngredient';
import ExploreFoodsByIngredient from '../pages/ExploreFoodsByIngredient';
import ExploreFoodsByNationality from '../pages/ExploreFoodsByNationality';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testando o componente Header', () => {
  // it('Teste se tem os data-testids exigidos', () => {
  //   renderWithRouter(<Foods />);
  //   const searchIcon = screen.getByTestId('search-top-btn');
  //   const profileIcon = screen.getByTestId('profile-top-btn');
  //   const title = screen.getByTestId('page-title');

  //   expect(searchIcon && profileIcon && title).toBeInTheDocument();
  // });

  it('Testa se o Header é exibido somente nas páginas requeridas', () => {
    const header = screen.getByTestId('header');

    renderWithRouter(<Login />);
    expect(header).not.toBeInTheDocument();

    // renderWithRouter(<Foods />);
    // expect(header).toBeInTheDocument();

    renderWithRouter(<FoodDetails />);
    expect(header).not.toBeInTheDocument();

    renderWithRouter(<FoodInProgress />);
    expect(header).not.toBeInTheDocument();

    // renderWithRouter(<Drinks />);
    // expect(header).toBeInTheDocument();

    renderWithRouter(<DrinkDetails />);
    expect(header).not.toBeInTheDocument();

    renderWithRouter(<DrinkInProgress />);
    expect(header).not.toBeInTheDocument();

    renderWithRouter(<Explore />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<ExploreDrinks />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<ExploreFoods />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<ExploreDrinksByIngredient />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<ExploreFoodsByIngredient />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<ExploreFoodsByNationality />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<Profile />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<DoneRecipes />);
    expect(header).toBeInTheDocument();

    renderWithRouter(<FavoriteRecipes />);
    expect(header).toBeInTheDocument();
  });

  it('Teste se o clique no botão de perfil redireciona para a tela de perfil', () => {
    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    expect(profileIcon).toHaveAttribute('href', '/profile');
  });

  it('Teste se o clique no botão de busca exibe e depois esconde a searchBar', () => {});
});
