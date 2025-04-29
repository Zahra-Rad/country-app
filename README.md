# Country Information Application

A React-based web application that displays country information with features like sorting, searching, and data visualization.

## Features

- Display country information in a table format
- Sort countries by name, population, and area
- Search functionality to filter countries
- Pagination for easy navigation
- Population and area chart visualization
- Responsive design using Tailwind CSS

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS
- **Data Visualization**: Chart.js
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Containerization**: Docker (optional)

## Project Structure

```
country-app/
├── src/
│   ├── components/
│   │   ├── table/          # Table-related components
│   │   ├── chart/          # Chart visualization components
│   │   ├── Pagination/     # Pagination component
│   │   └── SearchBar/      # Search functionality
│   ├── services/           # API and data services
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
├── public/                 # Static assets
└── package.json            # Project dependencies
```

## Components

### CountryTable
The main component that displays country data in a table format. Features include:
- Sorting by name, population, and area
- Integration with SearchBar and Pagination
- Data fetching using React Query

### PopulationChart
Visualizes country data using Chart.js:
- Displays population and area data
- Interactive chart with tooltips
- Metric selection (population/area)

### Pagination
Handles table navigation:
- Previous/Next buttons
- Current page indicator
- Disabled states for first/last page

### SearchBar
Provides search functionality:
- Real-time filtering
- Case-insensitive search
- Debounced input handling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd country-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Testing

The project uses Jest and React Testing Library for testing. Test files are located in the `tests` directory.

To run tests:
```bash
npm test              # Run tests in watch mode
npm run test:coverage # Generate test coverage report
```

## API Integration

The application uses the REST Countries API to fetch country data. The API service is implemented in `src/services/api.ts`.

### API Endpoints
- Base URL: `https://restcountries.com/v3.1`
- Endpoints:
  - `/all` - Get all countries
