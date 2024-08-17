import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import errorHandler from '../utils/errorHandler';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data, loading}] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen">

      <div className="w-full max-w-sm p-6 bg-gray-800  rounded-lg shadow-lg">
        <h4 className="text-3xl font-bold mb-4 permanent-marker-regular text-white">Login</h4>
        <div>
          {data ? (
            <p className="text-green-500">
              Success! You may now head{' '}
              <Link to="/" className="text-blue-500 underline">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 btn-sign wood-sign"
              >
                {(loading || Auth.loggedIn()) ? (<p className="mb-7">
                  Loading in!
                </p>): <p className="mb-7">
                  Login
                </p> }
                
              </button>
            </form>
          )}
  
          {error && (
            <div className="mt-4 p-3 bg-red-600 text-white rounded-md">
              {errorHandler(error.message)}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;