import React from "react";
import Header from "./header";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({ children }) => (
    <>
    <Header />
    <main role="main" className="bg-white">
      <div>
      {children}
      </div>
    </main>
    </>
)

export default Layout