import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_TASKS, GET_REWARDS } from './queries'; // Ensure this path is correct

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000/graphql',
  cache: new InMemoryCache(),
});

export const getTasks = async () => {
  try {
    const { data } = await client.query({
      query: GET_TASKS,
    });
    return data.getTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getRewards = async () => {
  try {
    const { data } = await client.query({
      query: GET_REWARDS,
    });
    return data.getRewards;
  } catch (error) {
    console.error('Error fetching rewards:', error);
    throw error;
  }
};

export const getKids = async () => {
    try {
      const { data } = await client.query({
        query: QUERY_KIDS,
      });
      return data.me.kids;
    } catch (error) {
      console.error('Error fetching kids:', error);
      throw error;
    }
  };
