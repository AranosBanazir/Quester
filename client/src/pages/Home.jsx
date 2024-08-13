const Home = () => {
  const {loading, error, data} = useQuery(ME)
  //use this in every component that uses the ME query
  //vvvvvvvvvvvvvvvvvvvvvvv
  const userType = data?.me.__typename || 'user'
  //^^^^^^^^^^^^^^^^^^^^^^^
 //use this in every component that uses the ME query
 //this will let us know if they are a Parent or a child
 //and we can then render the page to fit the user

  let relaventPage;

  if (data){
    if (userType === 'Parent'){
      relaventPage = <ParentHomePage/>
    }else if (userType === 'Child'){
      relaventPage = <ChildHomePage/>
    }
  }

  return (
    <main>
      {relaventPage}
    </main>
  );
};

export default Home;
