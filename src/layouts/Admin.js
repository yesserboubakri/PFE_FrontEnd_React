import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";

import RequireAdmin from "../guards/RequireAdmin"; 

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact render={() => (
              <RequireAdmin><Dashboard /></RequireAdmin>
            )} />
            
            <Route path="/admin/tables" exact render={() => (
              <RequireAdmin><Tables /></RequireAdmin>
            )} />

            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
