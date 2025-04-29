interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search..." 
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4 p-2 border rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
} 