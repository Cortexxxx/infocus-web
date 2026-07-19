import styles from "./Dashboard.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import MainSection from "./components/MainSection/MainSection";

export default function Dashboard() {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <MainSection />

      <Details />
    </div>
  );
}
