import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className=" mx-auto text-center flex flex-col justify-center items-center">
        <h4 className="text-sm">
          &copy; {new Date().getFullYear()} Made with contributions from: 
        </h4>
    
          <div className='flex flex-row flex-wrap'>

          <a href='https://github.com/LerieLogin' className="btn-github">
          
          </a>
          <p className='mr-5'>Larry Logan</p>

      
          <a href='https://github.com/Soko77788' className="btn-github"></a>
          <p className='mr-5'>Nick Sokolowski</p>
     
   
          <a href='https://github.com/AranosBanazir' className="btn-github"></a>
          <p className='mr-5'>Caleb Saiia</p>


          </div>
     
      </div>

    </footer>
  );
};

export default Footer;