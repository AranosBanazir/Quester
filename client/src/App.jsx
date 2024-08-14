import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import { RewardCartProvider } from './utils/RewardCartContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RewardCartProvider>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <Navbar />
        <div className="container">
          <Outlet />
        </div>
        <Footer />
      </div>
      </ RewardCartProvider>
    </ApolloProvider>
  );
}

export default App;