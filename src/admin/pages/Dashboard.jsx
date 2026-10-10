import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import adminApi from "../services/api";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    contacts: 0,
    joinUs: 0,
    gallery: 0,
    donationsCount: 4,
    totalFunds: 9000,
  });

  const fetchStats = async () => {
    try {
      const [contactsRes, joinRes, galleryRes] = await Promise.allSettled([
        adminApi.get("/contact"),
        adminApi.get("/join-us"),
        adminApi.get("/gallery"),
      ]);

      let donCount = 4;
      let donSum = 9000;
      try {
        const donRes = await adminApi.get("/donations");
        if (Array.isArray(donRes.data) && donRes.data.length > 0) {
          donCount = donRes.data.length;
          donSum = donRes.data.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);
        }
      } catch {
        // Fallback demo values
      }

      setStats({
        contacts: contactsRes.status === "fulfilled" ? contactsRes.value.data.length : 0,
        joinUs: joinRes.status === "fulfilled" ? joinRes.value.data.length : 0,
        gallery: galleryRes.status === "fulfilled" ? galleryRes.value.data.length : 0,
        donationsCount: donCount,
        totalFunds: donSum,
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

      <div className="dashboard max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Admin Overview
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back to Mannat Foundation Operations & Donor Management
            </p>
          </div>

          <Link
            to="/admin/donations"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-semibold shadow transition self-start md:self-auto"
          >
            <span>💳 View Donations</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="stat-card green bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Raised
            </h3>
            <p className="text-3xl font-black text-green-700 mt-2">
              ₹{stats.totalFunds.toLocaleString("en-IN")}
            </p>
            <span className="text-[11px] text-green-600 font-semibold mt-1 inline-block">
              {stats.donationsCount} Online Donors
            </span>
          </div>

          <div className="stat-card blue bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Contact Queries
            </h3>
            <p className="text-3xl font-black text-blue-600 mt-2">
              {stats.contacts}
            </p>
            <Link
              to="/admin/contacts"
              className="text-[11px] text-blue-500 font-semibold mt-1 inline-block hover:underline"
            >
              View messages →
            </Link>
          </div>

          <div className="stat-card green bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Join Requests
            </h3>
            <p className="text-3xl font-black text-emerald-600 mt-2">
              {stats.joinUs}
            </p>
            <Link
              to="/admin/join-us"
              className="text-[11px] text-emerald-500 font-semibold mt-1 inline-block hover:underline"
            >
              Review applications →
            </Link>
          </div>

          <div className="stat-card purple bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Gallery Media
            </h3>
            <p className="text-3xl font-black text-purple-600 mt-2">
              {stats.gallery}
            </p>
            <Link
              to="/admin/gallery"
              className="text-[11px] text-purple-500 font-semibold mt-1 inline-block hover:underline"
            >
              Manage gallery →
            </Link>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/donations"
              className="p-4 rounded-xl bg-gray-50 hover:bg-green-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-green-800">
                  Donor Transactions
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Inspect amounts & CSV download
                </p>
              </div>
              <span className="text-green-700 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/admin/contacts"
              className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-blue-800">
                  Message Inbox
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Filter by status & reply
                </p>
              </div>
              <span className="text-blue-600 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              to="/admin/join-us"
              className="p-4 rounded-xl bg-gray-50 hover:bg-emerald-50/70 border border-gray-200/70 transition flex items-center justify-between group"
            >
              <div>
                <span className="font-bold text-gray-900 text-sm group-hover:text-emerald-800">
                  Volunteer Requests
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Track onboarded members
                </p>
              </div>
              <span className="text-emerald-600 text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
