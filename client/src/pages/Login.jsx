import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import errorHandler from '../utils/errorHandler';

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data, loading}] = useMutation(LOGIN_USER);
  const [passwordImageState, setPasswordImageState] = useState('closed')

  const passwordImages = [
      "pig.webp",
      "sheep.png",
      "cow.webp",
      "firetruck.png",
      "chicken.webp"
  ]

  const handleImagePassword = (e, image) =>{
    e.preventDefault()
    const cleanImage = image.replace('.webp', '').replace('.png', '')
    const passwordInput = document.getElementById('password')
    passwordInput.value = passwordInput.value + cleanImage
    setFormState({
      ...formState,
      password: passwordInput.value
    })
  } 

  const togglePasswordImageState = (e) =>{
    e.preventDefault()
    if (passwordImageState === 'closed'){
      setPasswordImageState('open')
    }else{
      setPasswordImageState('closed')
    }
  }

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Submit form
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

    // Clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <h4 className="text-3xl font-bold mb-4 permanent-marker-regular text-white">Login</h4>
        <div>
          {data ? (
            <>
            </>
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
              <div className='flex flex-row items-center justify-center'>
              <button
                type="submit"
                className="w-full py-2 btn-sign wood-sign"
              >
                {(loading || Auth.loggedIn()) ? (
                  <p className="mb-7">Loading in!</p>
                ) : (
                  <p className="mb-7">Login</p>
                )}
              </button>
              <button className='w-[100px] flex flex-row justify-center' onClick={togglePasswordImageState}>
                <img src="/assets/key.png" alt="picture password" className=''/>
              </button>
              </div>

              {passwordImageState === 'closed' ? <></> : <section className='' id='picture-section'>
                  <div id='image-div' className='flex flex-wrap flex-row gap-5 items-center mx-auto justify-center'>
                    {passwordImages.map(image=>{
                      return (
                        <button onClick={(e)=>handleImagePassword(e, image)}>
                          <img src={`/assets/password-images/${image}`} alt="password image" key={image} className='max-w-[75px]'/>
                        </button>
                      )
                    })}
                  </div>
              </section>}  
              

            </form>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-600 text-white rounded-md">
              {errorHandler(error.message)}
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-300 permanent-marker-regular">Don't have an account?</p>
          <Link to="/signup" className="permanent-marker-regular btn-sign text-white rounded-md px-4 py-2">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
