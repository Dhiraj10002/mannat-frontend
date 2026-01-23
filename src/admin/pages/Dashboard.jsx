import { useEffect, useState } from "react";
import adminApi from "../services/api";

import "./Dashboard.css";
import { Helmet } from "react-helmet-async";


export default function Dashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    joinUs: 0,
    gallery: 0,
  });



  const fetchStats = async () => {
    try {
      const [contactsRes, joinRes, galleryRes] = await Promise.all([
      adminApi.get("/contact"),
      adminApi.get("/join-us"),
      adminApi.get("/gallery"),

      ]);

      setStats({
        contacts: contactsRes.data.length,
        joinUs: joinRes.data.length,
        gallery: galleryRes.data.length,
      });
    } catch (err) {
      console.error("Dashboard stats error", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
        
        <>
    <Helmet>
      <title>Admin Dashboard | Mannat Foundation</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>

    <div className="dashboard">
      <h2 className="page-title">Admin Dashboard</h2>
      {/* rest of your dashboard */}
    </div>
  

      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Contacts</h3>
          <p>{stats.contacts}</p>
        </div>

        <div className="stat-card green">
          <h3>Join Requests</h3>
          <p>{stats.joinUs}</p>
        </div>

        <div className="stat-card purple">
          <h3>Gallery Items</h3>
          <p>{stats.gallery}</p>
        </div>
      </div>
    </>
  );
}
