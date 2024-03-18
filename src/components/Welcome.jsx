import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectCurrentToken,
} from "../features/auth/authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const welcome = token ? `welcome ${user}!` : "welcome!";
  const tokenAbbrivation = `${token.slice(0, 9)}...`;
  const content = (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbrivation}</p>
      <p>
        <Link to="/userslist">Go to the users list</Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;
