import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CHILD } from '../../utils/mutations';

const AddChildForm = ({ userId }) => {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  
    const [addChild, { data, loading, error }] = useMutation(ADD_CHILD, {
        onCompleted: (data) => {
            console.log('Mutation successful:', data);
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

        console.log('Submitting form with values:', { username, password });


        addChild({
            variables: {
                username,
                password,
            },
        }).catch(err => {
            console.error('Mutation error:', err);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2  className="text-red-500">Add Child</h2>
            <div>
                <label  className="text-red-500" htmlFor="username">Username:</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label   className="text-red-500" htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button  className="text-red-500" type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Child'}
            </button>
            {error && <p>Error: {error.message || 'An unknown error occurred'}</p>}
            {data && <p>Child added: {data.addChild.username}</p>}
        </form>
    );
};

export default AddChildForm;