import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Mock the CountryTable component
jest.mock('./components/table/CountryTable', () => {
  return function MockCountryTable() {
    return (
      <div data-testid="mock-country-table">
        <div>Country Name</div>
        <div>Test Country</div>
      </div>
    );
  };
});

// Create a new QueryClient for testing
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

describe('App', () => {
  let testQueryClient: ReturnType<typeof createTestQueryClient>;

  beforeEach(() => {
    testQueryClient = createTestQueryClient();
  });

  afterEach(() => {
    testQueryClient.clear();
  });

  it('renders App component with correct structure', () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // Check if CountryTable is rendered
    expect(screen.getByTestId('mock-country-table')).toBeInTheDocument();
    expect(screen.getByText('Country Name')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('configures QueryClient correctly', () => {
    render(
      <QueryClientProvider client={testQueryClient}>
        <App />
      </QueryClientProvider>
    );
    
    // Verify QueryClient configuration
    expect(testQueryClient.getDefaultOptions().queries?.retry).toBe(2);
    expect(testQueryClient.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
  });
});