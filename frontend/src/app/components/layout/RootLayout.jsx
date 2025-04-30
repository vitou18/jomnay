import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../../_template/assets/img/small_logo.png";
import Modal from "../../utils/Modal";
import Sidebar from "../sidebar/Sidebar";
import Action from "../../utils/Action";
import { MdSpaceDashboard } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import useAuth from "../../module/Auth/core/action";
import { TbReceiptDollar, TbLocationDollar } from "react-icons/tb";

const sidebarItems = [
  { path: "/", name: "Dashboard", icon: <MdSpaceDashboard /> },
  { path: "/income", name: "Income", icon: <TbReceiptDollar /> },
  { path: "/expense", name: "Expense", icon: <TbLocationDollar /> },
  { path: "/report", name: "Report", icon: <HiOutlineDocumentReport /> },
];

const RootLayout = () => {
  const { onLogout } = useAuth();
  const [show, setShow] = useState(false);

  const onClickModal = () => {
    setShow((pre) => !pre);
  };

  const onClickLogout = async () => {
    await onLogout();
    setShow((pre) => !pre);
  };

  return (
    <div className="font-popins">
      <Sidebar
        logo={logo}
        onClickModal={onClickModal}
        sidebarItems={sidebarItems}
      />

      <div className="transition-all relative duration-300 md:ml-64">
        <Outlet />
      </div>

      <Modal
        show={show}
        setShow={setShow}
        title="Logout"
        desc="Are you sure you want to logout?"
      >
        <Action
          cancelText="Cancel"
          submitText="Yes"
          onCancel={() => setShow((pre) => !pre)}
          onSubmit={onClickLogout}
        />
      </Modal>
    </div>
  );
};

export default RootLayout;
