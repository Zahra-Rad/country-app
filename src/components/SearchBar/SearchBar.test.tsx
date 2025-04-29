import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const handleChange = jest.fn();
    render(
      <SearchBar 
        value="" 
        onChange={handleChange} 
        placeholder="Custom Placeholder" 
      />
    );
    
    const input = screen.getByPlaceholderText('Custom Placeholder');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('displays the correct value', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="test value" onChange={handleChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toHaveValue('test value');
  });
}); 