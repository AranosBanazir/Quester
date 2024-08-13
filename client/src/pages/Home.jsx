import { useQuery } from "@apollo/client";
import {ME} from '../utils/queries'
const Home = () => {
  const {loading, error, data} = useQuery(ME)

  console.log(data)
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>{data}</h1>
        </div>
      </div>
    </main>
  );
};

export default Home;
