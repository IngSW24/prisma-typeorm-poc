import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Todos from './Todos';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-10">
        <Todos />
      </div>
    </QueryClientProvider>
  );
}
