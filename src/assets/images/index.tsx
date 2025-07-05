import logo from "./../logo/logo.png";
import login from "./login.png";
import signup from "./signup.png";
import sidebarLogo from "./sidebar-logo.png";
import loginLogo from "./login-logo.png";
import loginLogo1 from "./login-logo1.png";
import dietPlan1 from "./dietPlan1.png";
import dietPlan2 from "./dietPlan2.png";
import user from "./user.png";
import exercise1 from "./images/exercise-1.png";
import exercise2 from "./images/exercise-2.png";
import exercise3 from "./images/exercise-3.png";
import exercise4 from "./images/exercise-4.png";
import workout from "./workout.png";
import chat from "./chat.png";

interface Props {
  name: string;
  size?: number;
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Img = (props: Props) => {
  switch (props.name.toLowerCase()) {
    case "logo":
      return (
        <img
          src={logo}
          alt="Rudder logo"
          className="m-auto"
          height={36}
          width={36}
        />
      );
    case "user":
      return (
        <img
          src={user}
          alt="user"
          className="m-auto"
          height={props.height || 191}
          width={props.width || 191}
        />
      );
    case "user-logo":
      return (
        <img
          src={user}
          alt="user"
          className="m-auto"
          height={48}
          width={48}
          style={{ borderRadius: "8px" }}
        />
      );
    case "login":
      return (
        <img
          src={login}
          alt="login"
          className="m-auto"
          height="100%"
          width={680}
        />
      );
    case "signup":
      return (
        <img
          src={signup}
          alt="signup"
          className="m-auto"
          height="100%"
          width={680}
        />
      );
    case "diet-plan-1":
      return (
        <img
          src={dietPlan1}
          alt="diet plan 1"
          className="m-auto"
          height={props.height || "100%"}
          width={props.width || 218}
        />
      );
    case "diet-plan-2":
      return (
        <img
          src={dietPlan2}
          alt="diet plan 2"
          className="m-auto"
          height="100%"
          width={218}
        />
      );
    case "sidebar-logo":
      return (
        <img
          src={sidebarLogo}
          alt="sidebar"
          className="m-auto"
          height="40"
          width={40}
        />
      );
    case "login-logo":
      return (
        <img
          src={loginLogo}
          alt="sidebar"
          className="m-auto"
          height={props.size || 50}
          width={props.size || 50}
        />
      );
      case "login-logo1":
        return (
          <img
            src={loginLogo1}
            alt="sidebar"
            className="m-auto"
            height={props.size || 50}
            width={props.size || 50}
          />
        );
    case "exercise-1":
      return (
        <img src={exercise1} alt="exercise-1" className={props.className} />
      );
    case "exercise-2":
      return (
        <img src={exercise2} alt="exercise-2" className={props.className} />
      );
    case "chat":
      return (
        <img src={chat} alt="chat" className={props.className} />
      );
    case "exercise-3":
      return (
        <img src={exercise3} alt="exercise-3" className={props.className} />
      );
    case "exercise-4":
      return (
        <img src={exercise4} alt="exercise-4" className={props.className} />
      );

    case 'workout':
      return <img src={workout} alt="workoutImage" className="m-auto" height={props.size || 30} width={props.width || 40} />;

    default:
      break;
  }

  return <img src={workout} alt="workoutImage" className="m-auto" height={props.size || 30} width={props.width || 40} />;
};

/* eslint-disable import/no-default-export */
export default Img;
