import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CHILD, DELETE_USER } from "../../utils/mutations";
import { QUERY_SINGLE_USER } from "../../utils/queries";

const KidCard = ({ _id, username }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDeletingMode, setDeletingMode] = useState(false);

  const [updateChild, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_CHILD);
  const [deleteUser, { loading: deleteLoad, error: deleteError }] =
    useMutation(DELETE_USER);

  useEffect(() => {
    setNewUserName(username);
  }, []);

  const handleDeleteChild = async () => {
    if (!newPassword) {
        return
    }
    await deleteUser({
        variables: {creds: {
            username,
            password: newPassword
        }},
        refetchQueries: [
            QUERY_SINGLE_USER,
            'user'
        ]
    }) 
  }


  const handleUpdateUser = async () => {
    const updatedChildInfo = { oldUsername: username };
    if (newUserName) {
      updatedChildInfo.username = newUserName;
    }
    if (newPassword) {
      updatedChildInfo.password = newPassword;
    }
    await updateChild({
      variables: { updatedChildInfo },
    });
    setIsEditMode(false);
  };

  return (
    <div className="card bg-neutral text-neutral-content w-full sm:w-auto " key={_id}>
      <div className="card-body items-center text-center relative z-10">
        <h2 className="card-title text-white permanent-marker-regular">{newUserName}</h2>
  
        {isEditMode && (
          <label className="input input-bordered flex flex-col sm:flex-row items-center gap-2 mt-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              type="text"
              className="grow"
              placeholder="Username"
            />
          </label>
        )}
  
        {(isEditMode || isDeletingMode) && (
          <label className="input input-bordered flex flex-col sm:flex-row items-center gap-2 mt-4 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
          </label>
        )}
  
        <div className="card-actions justify-center flex flex-wrap gap-2 mt-4 w-full">
          {isEditMode && (
            <button className="btn btn-primary" onClick={handleUpdateUser}>
              {updateLoading ? "Saving..." : "Save"}
            </button>
          )}
          {(isEditMode || isDeletingMode) && (
            <button
              className="btn btn-ghost border border-white"
              onClick={() => {
                setIsEditMode(false);
                setDeletingMode(false);
              }}
            >
              Cancel
            </button>
          )}
          {!isEditMode && !isDeletingMode && (
            <button
              className="btn btn-info"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </button>
          )}
          {!isDeletingMode && !isEditMode && (
            <button
              className="btn btn-error"
              onClick={() => setDeletingMode(true)}
            >
              Delete
            </button>
          )}
          {isDeletingMode && (
            <button
              className="btn btn-error"
              onClick={handleDeleteChild}
            >
              Confirm Delete?
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default KidCard;