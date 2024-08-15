

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
import { useEffect } from 'react';

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
  useEffect(()=>{
    const backgrounds = [
      "tropical",
      "treehouse"
    ]
    const rndBackgroundIndex = Math.floor(Math.random() * backgrounds.length)
    const background = backgrounds[rndBackgroundIndex]

    document.querySelector('body')
            .setAttribute('style', `background-image: url("/assets/backgrounds/${background}.jpg");`)

  }, [])


  return (
    <ApolloProvider client={client}>
      <RewardCartProvider>
        <div className='flex flex-col min-h-screen'>
          <Header />
            <Outlet />
          <Footer />
        </div>
      </RewardCartProvider>
    </ApolloProvider>
  );
}

export default App;