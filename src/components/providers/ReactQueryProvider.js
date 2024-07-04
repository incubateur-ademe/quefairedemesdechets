import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const RootElement = ({ children }) => <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>

export default RootElement;
