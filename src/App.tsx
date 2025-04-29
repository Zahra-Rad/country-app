import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryTable from './components/table/CountryTable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 py-8">
        <CountryTable />
      </div>
    </QueryClientProvider>
  );
}