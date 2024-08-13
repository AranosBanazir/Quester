import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '../utils/queries';

const MyTasks = () => {
  const { data, error, loading } = useQuery(GET_TASKS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Tasks:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyTasks
