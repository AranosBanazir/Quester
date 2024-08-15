import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import AddChildForm from './AddChildForm';

const ParentAccount = () => {
    const { data, loading, error } = useQuery(ME);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    const userId = data?.me?._id;

    return (
        <div className="container mx-auto p-4">
            
            {userId ? (
                <AddChildForm userId={userId} />
            ) : (
                <p className="text-center text-gray-500">No user ID found.</p>
            )}
        </div>
    );
};

export default ParentAccount;
