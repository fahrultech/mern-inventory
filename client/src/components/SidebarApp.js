import React, { useEffect } from "react";
import { SidebarNoSub, SidebarWithSub } from "./common/Sidebar";
import App from "./common/app";

const SidebarApp = () => {
  useEffect(() => App());
  return (
    <div className="left side-menu">
      <div className="sidebar-inner slimscrollleft">
        <div id="sidebar-menu">
          <ul>
            <SidebarNoSub name="Dashboard" link="/" icon="mdi mdi-home" />
            <SidebarWithSub
              name="Data Barang"
              listSub={[
                {
                  name: "Produk",
                  linkTo: "/produk",
                },
                {
                  name: "Kategori",
                  linkTo: "/kategori",
                },
                {
                  name: "Subkategori",
                  linkTo: "/subkategori",
                },
              ]}
              icon="mdi mdi-desktop-mac"
            />
            <SidebarWithSub
              name="Penjualan"
              listSub={[
                {
                  name: "Invoice",
                  linkTo: "/invoice",
                },
                {
                  name: "Quotation",
                  linkTo: "/quotation",
                },
              ]}
              icon="mdi mdi-cash"
            />
            <SidebarNoSub
              name="Supplier"
              link="/supplier"
              icon="mdi mdi-account"
            />
            <SidebarNoSub name="Logout" link="/" icon="mdi mdi-logout" />
          </ul>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  );
};
export default SidebarApp;
