import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import AddChildForm from './AddChildForm';

const ParentAccount = () => {
    const { data, loading, error } = useQuery(ME);

    console.log('Loading ME query:', loading);
    console.log('Error in ME query:', error);
    console.log('Data from ME query:', data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const userId = data?.me?._id;

    console.log('User ID:', userId);

    return (
        <div>
            <h1>Parent Account</h1>
            {userId && <AddChildForm userId={userId} />}
        </div>
    );
};

export default ParentAccount;