import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CHILD} from '../../utils/mutations';
import { QUERY_SINGLE_USER } from '../../utils/queries';
const AddChildForm = ({ userId }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [addChild, { data, loading, error }] = useMutation(ADD_CHILD, {
        onCompleted: (data) => {
            setUsername(''); 
            setPassword(''); 
        },
        onError: (err) => {
            console.error('Error adding child:', err.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            console.error('Username or password is missing');
            return;
        }


        addChild({
            variables: {
                username,
                password,
            },
            refetchQueries: [QUERY_SINGLE_USER, "user"]
        }).catch(err => {
            console.error('Mutation error:', err);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md shadow-lg mx-auto max-w-[75%] mt-10">
            <h2 className="text-3xl font-bold mb-4 text-white permanent-marker-regular">Add Child</h2>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2 permanent-marker-regular">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2 permanent-marker-regular">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 permanent-marker-regular"
            >
                {loading ? 'Adding...' : 'Add Child'}
            </button>
            {error && <p className="mt-4 text-red-500 permanent-marker-regular">Error: {error.message || 'An unknown error occurred'}</p>}
            {data && <p className="mt-4 permanent-marker-regular text-green-500">Child added: {data.addChild.username}</p>}
        </form>
    );
};

export default AddChildForm;