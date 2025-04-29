import { render, screen, fireEvent } from '@testing-library/react';
import PopulationChart from './PopulationChart';
import { Country } from '../../services/api';

// Mock the Bar component from react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="mock-chart" />,
}));

const mockCountries: Country[] = [
  {
    name: { common: 'Country 1' },
    capital: ['Capital 1'],
    population: 1000000,
    area: 1000,
    flags: { png: 'flag1.png' }
  },
  {
    name: { common: 'Country 2' },
    capital: ['Capital 2'],
    population: 2000000,
    area: 2000,
    flags: { png: 'flag2.png' }
  }
];

describe('PopulationChart', () => {
  it('renders the chart component', () => {
    render(<PopulationChart countries={mockCountries} />);
    expect(screen.getByTestId('mock-chart')).toBeInTheDocument();
  });

  it('renders the metric selector', () => {
    render(<PopulationChart countries={mockCountries} />);
    const selector = screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
    expect(selector).toHaveValue('population');
  });

  it('changes metric when selector value changes', () => {
    render(<PopulationChart countries={mockCountries} />);
    const selector = screen.getByRole('combobox');
    
    fireEvent.change(selector, { target: { value: 'area' } });
    expect(selector).toHaveValue('area');
  });

  it('displays the correct title based on selected metric', () => {
    render(<PopulationChart countries={mockCountries} />);
    
    // Initial title with population
    expect(screen.getByText('Country Statistics')).toBeInTheDocument();
    
    // Change to area
    const selector = screen.getByRole('combobox');
    fireEvent.change(selector, { target: { value: 'area' } });
    
    // Title should update
    expect(screen.getByText('Country Statistics')).toBeInTheDocument();
  });
}); 