import React from 'react';
import { render, screen } from '@testing-library/react';
import Hospital from '../../components/Hospitals';

describe('Hospital', () => {
  test('renders hospital component', () => {
    render(<Hospital />);
    expect(screen.getByText(/Hospital Directory/i)).toBeInTheDocument();
  });
});


// Mock the fetch function
global.fetch = jest.fn();

const mockHospitals = [
  {
    name: "City Hospital",
    location: "Main Street",
    city: "Mumbai",
    area: "Andheri",
    ownership: "Public",
    charges: {
      OPD: "500",
      blood_test: "1000",
      operation: "50000"
    },
    health_schemes: ["Scheme1", "Scheme2"]
  },
  {
    name: "Private Hospital",
    location: "Park Road",
    city: "Delhi",
    area: "Connaught Place",
    ownership: "Private",
    charges: {
      OPD: "800",
      blood_test: "1500",
      operation: "75000"
    },
    health_schemes: ["Scheme3"]
  }
];

describe('Hospital Component', () => {
  beforeEach(() => {
    fetch.mockImplementation(() => 
      Promise.resolve({
        json: () => Promise.resolve(mockHospitals)
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders hospital directory title', async () => {
    render(<Hospital />);
    expect(screen.getByText('Hospital Directory')).toBeInTheDocument();
  });

  test('filters hospitals by search term', async () => {
    render(<Hospital />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText('Search by hospital name or location...');
    fireEvent.change(searchInput, { target: { value: 'City Hospital' } });

    expect(screen.getByText('City Hospital')).toBeInTheDocument();
    expect(screen.queryByText('Private Hospital')).not.toBeInTheDocument();
  });

  test('filters hospitals by city', async () => {
    render(<Hospital />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const citySelect = screen.getByRole('combobox', { name: '' });
    fireEvent.change(citySelect, { target: { value: 'Mumbai' } });

    expect(screen.getByText('City Hospital')).toBeInTheDocument();
    expect(screen.queryByText('Private Hospital')).not.toBeInTheDocument();
  });

  test('filters hospitals by ownership', async () => {
    render(<Hospital />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const ownershipSelect = screen.getAllByRole('combobox')[2];
    fireEvent.change(ownershipSelect, { target: { value: 'Private' } });

    expect(screen.queryByText('City Hospital')).not.toBeInTheDocument();
    expect(screen.getByText('Private Hospital')).toBeInTheDocument();
  });

  test('displays no results message when no hospitals match filters', async () => {
    render(<Hospital />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    const searchInput = screen.getByPlaceholderText('Search by hospital name or location...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentHospital' } });

    expect(screen.getByText('No hospitals found')).toBeInTheDocument();
  });
});
