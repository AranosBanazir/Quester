import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import AddChildForm from './AddChildForm';
import AuthCheck from '../../components/AuthCheck';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
const ParentAccount = () => {
    const { data, loading, error } = useQuery(ME);
    const navigate = useNavigate()

    

    if (loading) return <Spinner/>;
    
    if (data?.me?.__typename === 'Child'){
        console.log('here')
        navigate('/tasks')
    }
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    const userId = data?.me?._id;

    return (
        <AuthCheck>
        <div className="container mx-auto p-4">
            
            {userId ? (
                <AddChildForm userId={userId} />
            ) : (
                <p className="text-center text-gray-500">No user ID found.</p>
            )}
        </div>
        </AuthCheck>
    );
};

export default ParentAccount;
