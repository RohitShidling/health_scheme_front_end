import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HeroSection from '../../components/HeroSection';

describe('HeroSection', () => {
  test('renders search input', () => {
    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Search health schemes/i)).toBeInTheDocument();
  });
});

// Mock axios
jest.mock('axios');

const mockSchemes = [
  { _id: '1', title: 'Health Scheme 1' },
  { _id: '2', title: 'Health Scheme 2' }
];

describe('HeroSection Component', () => {
  test('searches for health schemes and displays results', async () => {
    axios.get.mockResolvedValueOnce({ data: mockSchemes });

    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search health schemes');
    fireEvent.change(searchInput, { target: { value: 'Health' } });

    await waitFor(() => {
      expect(screen.getByText('Health Scheme 1')).toBeInTheDocument();
      expect(screen.getByText('Health Scheme 2')).toBeInTheDocument();
    });
  });

  test('displays error message when no schemes are found', async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 404 } });

    render(
      <BrowserRouter>
        <HeroSection />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search health schemes');
    const searchButton = screen.getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'NonexistentScheme' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('No schemes found.')).toBeInTheDocument();
    });
  });
});