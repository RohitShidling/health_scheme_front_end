import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

jest.mock('./components/Navbar', () => () => <div>Navbar</div>);
jest.mock('./components/Footer', () => () => <div>Footer</div>);
jest.mock('./components/HeroSection', () => () => <div>HeroSection</div>);
jest.mock('./components/SchemesSection', () => () => <div>SchemesSection</div>);
jest.mock('./components/QuickLinks', () => () => <div>QuickLinks</div>);

describe('App', () => {
  test('renders main components', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Navbar/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer/i)).toBeInTheDocument();
  });
});