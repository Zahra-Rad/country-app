import { render, screen, fireEvent } from '@testing-library/react';
import TableBody from './TableBody';
import { Country } from '../../services/api';

const mockCountries: Country[] = [
  {
    name: { common: 'Test Country' },
    capital: ['Test Capital'],
    population: 1000000,
    area: 1000,
    flags: { png: 'test-flag.png' }
  }
];

describe('TableBody', () => {
  it('renders country data correctly', () => {
    render(<TableBody countries={mockCountries} />);
    
    // Check if country name is rendered
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    
    // Check if capital is rendered
    expect(screen.getByText('Test Capital')).toBeInTheDocument();
    
    // Check if population is formatted correctly
    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    
    // Check if area is formatted correctly
    expect(screen.getByText('1,000')).toBeInTheDocument();
    
    // Check if flag image is rendered with correct alt text
    const flagImage = screen.getByAltText('Test Country flag');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', 'test-flag.png');
  });

  it('handles missing capital correctly', () => {
    const countryWithoutCapital: Country[] = [{
      ...mockCountries[0],
      capital: []
    }];
    
    render(<TableBody countries={countryWithoutCapital} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });
}); 