import { useHistory } from "react-router-dom";
import { FiHelpCircle, FiLogOut, FiPieChart } from "react-icons/fi";
import { MdOutlineLeaderboard } from "react-icons/md";

import styles from "./styles.module.scss";
import Toast from "../Toast";

import { useAuth } from "../../contexts/authContext";

export const MenuProfileOptions = () => {
  const { signOut, username } = useAuth();
  const history = useHistory();

  const pageOptions = [
    {
      name: "Dashboard",
      icon: <FiPieChart />,
      route: "/dashboard",
    },
    {
      name: "Rank",
      icon: <MdOutlineLeaderboard />,
      route: "/leaderboard",
    },
    {
      name: "Suport",
      icon: <FiHelpCircle />,
      route: "/suport",
    },
    {
      isSignOut: true,
      name: "Sign Out",
      icon: <FiLogOut />,
    },
  ];

  const handleSignOut = () => {
    const confirm = window.confirm("Are you sure you want to sign out?");
    if (!confirm) return;

    const { error } = signOut();
    if (error) {
      Toast.error();
      console.log(error);
    } else {
      history.replace("/");
    }
  };

  const is = (page: string) => {
    return Boolean(history.location.pathname === page);
  };

  return (
    <div className={styles.container}>
      <h2 style={{ marginBottom: 20 }}>Welcome, {username}!</h2>

      {pageOptions.map(({ isSignOut, name, icon, route }) => (
        <div
          className={
            isSignOut
              ? styles.divExit
              : is(route)
              ? styles.activePageOption
              : styles.pageOption
          }
          onClick={() => (isSignOut ? handleSignOut() : history.push(route))}
        >
          <span style={{ marginRight: 10 }}>{icon}</span>

          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};
