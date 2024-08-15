import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER, ME } from '../../utils/queries';
import AddChildForm from './AddChildForm';

const ParentAccount = () => {
    const { data, loading, error } = useQuery(ME);
    const userId = data?.me?._id;
    const {data: signleUserData, loading: singleUserLoading, error: singleUserError } = useQuery(QUERY_SINGLE_USER, {
        variables: {
            userId
        }
    })

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    

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
