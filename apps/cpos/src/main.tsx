// Entry point for the GTPOS web application.
// Sets up global providers: AbilityContext (for permissions), React Query, and React Router.
// Dynamically chooses BrowserRouter or HashRouter based on VITE_MODE environment variable.

import { AbilityContext, defineAbilitiesFromPermissions } from '@gtpos/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';

async function init() {
  // Example role document for initializing permissions
  const roleDoc = {
    _id: 'role_cashier',
    type: 'role_permission',
    role: 'cashier',
    modules: [
      {
        name: 'sales_invoice',
        permissions: ['create', 'read', 'view'],
      },
      {
        name: 'returns',
        permissions: ['read'],
      },
    ],
  };

  // Define user abilities based on role permissions
  const ability = defineAbilitiesFromPermissions(roleDoc);

  // Initialize React Query client
  const queryClient = new QueryClient();

  // Choose router type based on environment
  const Router = BrowserRouter;
  // Render the application with all providers
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Router>
        <AbilityContext.Provider value={ability}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AbilityContext.Provider>
      </Router>
    </React.StrictMode>
  );
}

init();
