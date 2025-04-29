import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryTable from './CountryTable';

// Mock axios at the top level
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] }))
}));

// Mock child components
jest.mock('../chart/PopulationChart', () => () => <div data-testid="population-chart" />);
jest.mock('../Pagination/Pagination', () => ({ currentPage, totalPages, onPageChange }: any) => (
  <div data-testid="pagination">
    <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
  </div>
));
jest.mock('../SearchBar/SearchBar', () => ({ value, onChange }: any) => (
  <input
    data-testid="search-bar"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Search by country name"
  />
));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('CountryTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    render(<CountryTable />, { wrapper });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders country data and handles sorting by name', async () => {
    const mockData = [
      {
        name: { common: 'Botswana' },
        capital: ['Gaborone'],
        population: 2351625,
        area: 582000,
        flags: { png: 'https://flagcdn.com/w320/bw.png' },
      },
      {
        name: { common: 'Tonga' },
        capital: ["Nuku'alofa"],
        population: 105697,
        area: 747,
        flags: { png: 'https://flagcdn.com/w320/to.png' },
      },
      {
        name: { common: 'Greece' },
        capital: ['Athens'],
        population: 10715549,
        area: 131990,
        flags: { png: 'https://flagcdn.com/w320/gr.png' },
      }
    ];

    const axios = require('axios');
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<CountryTable />, { wrapper });

    // Wait for initial render and verify all countries are present
    await waitFor(() => {
      expect(screen.getByText('Botswana')).toBeInTheDocument();
      expect(screen.getByText('Tonga')).toBeInTheDocument();
      expect(screen.getByText('Greece')).toBeInTheDocument();
    });

    // Initial state should be ascending order
    const countryNames = screen.getAllByText(/Botswana|Tonga|Greece/);
    expect(countryNames[0]).toHaveTextContent('Botswana');
    expect(countryNames[1]).toHaveTextContent('Greece');
    expect(countryNames[2]).toHaveTextContent('Tonga');

    // Find the Country Name header and click it for descending sort
    const nameHeader = screen.getByText('Country Name');
    fireEvent.click(nameHeader);

    // Wait for descending sort to complete and verify order
    await waitFor(() => {
      const sortedNames = screen.getAllByText(/Botswana|Tonga|Greece/);
      expect(sortedNames[0]).toHaveTextContent('Tonga');
      expect(sortedNames[1]).toHaveTextContent('Greece');
      expect(sortedNames[2]).toHaveTextContent('Botswana');
    });

    // Click again for ascending sort
    fireEvent.click(nameHeader);

    // Wait for ascending sort to complete and verify order
    await waitFor(() => {
      const sortedNames = screen.getAllByText(/Botswana|Tonga|Greece/);
      expect(sortedNames[0]).toHaveTextContent('Botswana');
      expect(sortedNames[1]).toHaveTextContent('Greece');
      expect(sortedNames[2]).toHaveTextContent('Tonga');
    });
  });

  it('handles pagination correctly', async () => {
    const mockData = Array.from({ length: 12 }, (_, i) => ({
      name: { common: `Country ${String.fromCharCode(65 + i)}` }, // A, B, C, etc.
      capital: [`Capital ${i + 1}`],
      population: 1000000 * (i + 1),
      area: 1000 * (i + 1),
      flags: { png: `https://flagcdn.com/w320/flag${i + 1}.png` },
    }));

    const axios = require('axios');
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<CountryTable />, { wrapper });

    // Wait for initial render and verify first page countries (A through J)
    await waitFor(() => {
      expect(screen.getByText('Country A')).toBeInTheDocument();
      expect(screen.getByText('Country J')).toBeInTheDocument();
    });

    // Verify first page has 10 countries
    const firstPageCountries = screen.getAllByText(/Country [A-J]/);
    expect(firstPageCountries.length).toBe(10);

    // Click next button
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Wait for second page to load and verify remaining countries (K and L)
    await waitFor(() => {
      const secondPageCountries = screen.getAllByText(/Country [K-L]/);
      expect(secondPageCountries.length).toBe(2);
    });
  });

  it('handles search functionality', async () => {
    const mockData = [
      {
        name: { common: 'Botswana' },
        capital: ['Gaborone'],
        population: 2351625,
        area: 582000,
        flags: { png: 'https://flagcdn.com/w320/bw.png' },
      },
      {
        name: { common: 'Tonga' },
        capital: ["Nuku'alofa"],
        population: 105697,
        area: 747,
        flags: { png: 'https://flagcdn.com/w320/to.png' },
      }
    ];

    const axios = require('axios');
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<CountryTable />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('Botswana')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('search-bar');
    fireEvent.change(searchInput, { target: { value: 'Tonga' } });

    await waitFor(() => {
      expect(screen.queryByText('Botswana')).not.toBeInTheDocument();
      expect(screen.getByText('Tonga')).toBeInTheDocument();
    });
  });
});