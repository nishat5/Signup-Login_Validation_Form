import React from "react";
import Swal from "sweetalert2";

const SucessfullyLogin = ({ username, login }) => {
  //   const [login, setLogin] = useState(true);

  const getLogout = () => {
    login(false);
    {
      Swal.fire({
        title: username,
        text: "You Have Been Sucessfully Logout.",
        icon: "success",
        customClass: "swal-wide",
      });
    }
  };

  return (
    <div className="WelcomeScreen">
      <div>
        <h1>
          <span style={{ color: "red", fontSize: "40px" }}>"{username}"</span>{" "}
          has been login sucessfully.
        </h1>
      </div>
      <div>
        <button
          style={{
            width: "100%",
            padding: "8px 10px",
            marginTop: "8px",
            fontSize: "17px",
            background: "black",
            color: "white",
            cursor: "pointer",
            fontFamily: "Comfortaa",
          }}
          onClick={getLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SucessfullyLogin;
