import React from "react";
import Header from "../components/Header";
import "./pagesCSS/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <aside className="sidebar">
          <button>
            <Link to="/task-manager">Task Manager</Link>
          </button>
          <button>
            <Link to="/counter">Counter</Link>
          </button>
          <button>
            <Link to="/booking">Appointment Booking</Link>
          </button>
        </aside>
        <section className="content">
          <h3>Welcome!</h3>
          <p>
            Use the sidebar buttons to navigate to different tools and sections.
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;
