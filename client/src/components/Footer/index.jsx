import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <h4 className="text-sm">
          &copy; {new Date().getFullYear()} - Proj 3 Starter
        </h4>
      </div>
    </footer>
  );
};

export default Footer;