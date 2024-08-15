import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        {location.pathname !== '/' && (
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 mb-4 transition-colors duration-200"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4 className="text-sm">
          &copy; {new Date().getFullYear()} - Proj 3 Starter
        </h4>
      </div>
    </footer>
  );
};

export default Footer;