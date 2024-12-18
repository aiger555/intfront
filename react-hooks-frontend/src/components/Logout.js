import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"; // For redirecting after logout

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("authToken"); // Clear the token from localStorage
    history.push("/login"); // Redirect to login page
  }, [history]);

  return (
    <div>
      <h2>You have been logged out.</h2>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
