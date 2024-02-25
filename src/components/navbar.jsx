import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <header>
      <div class="samurise-brand">
        <h1>Samurise</h1>
      </div>
      <nav class="navbar">
        <ul class="navbar-list">
          <li class="navbar-item">
            <a href="dashboard">Dashboard</a>
          </li>
          <li class="navbar-item">
            <a href="stats">Stats</a>
          </li>
          <li class="navbar-item">
            <a href="settings">Settings</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
