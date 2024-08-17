import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER, ME } from "../../utils/queries";
// import { UPDATE_USER } from "../../utils/mutations"; // Adjust the path if necessary
import AddChildForm from "./AddChildForm";
import AuthCheck from "../../components/AuthCheck";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import KidCard from "../../components/KidCard";

const ParentAccount = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ME);
  const userId = data?.me?._id;
  const {
    data: singleUserData,
    loading: singleUserLoading,
    error: singleUserError,
  } = useQuery(QUERY_SINGLE_USER, {
    variables: {
      userId,
    },
  });

  const kids = singleUserData?.user?.kids || [];

  


  if (loading) return <Spinner />;

  if (data?.me?.__typename === "Child") {
    navigate("/tasks");
  }
  if (error)
    if (error.message === 'Could not authenticate user.'){
      navigate("/login");
      return <p className="text-center text-red-500">Error: {error.message}</p>;
    }

  return (
    <AuthCheck>
      <div className="container mx-auto p-4">
        {userId ? (
          <AddChildForm userId={userId} />
        ) : (
          <p className="text-center text-gray-500">No user ID found.</p>
        )}
        <div className="flex wrap mt-5 gap-5">
          {kids.map((kid) => {
            return <KidCard {...kid} key={kid._id}/>
            
          })}
        </div>
      </div>
    </AuthCheck>
  );
};

export default ParentAccount;
