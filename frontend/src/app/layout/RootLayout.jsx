import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import logo from "../../_template/assets/img/small_logo.png";
import useAuth from "../module/Auth/core/action";
import Modal from "../utils/Modal";
import Sidebar from "./components/sidebar/Sidebar";
import Loader from "./components/other/Loader";
import Action from "../utils/Action";
import {
  MdOutlineAttachMoney,
  MdOutlineMoneyOff,
  MdSpaceDashboard,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";

const sidebarItems = [
  { path: "/", name: "Dashboard", icon: <MdSpaceDashboard /> },
  { path: "/income", name: "Income", icon: <MdOutlineAttachMoney /> },
  { path: "/expense", name: "Expense", icon: <MdOutlineMoneyOff /> },
  { path: "/report", name: "Report", icon: <HiOutlineDocumentReport /> },
];

const RootLayout = () => {
  const { onLogout } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

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
        {loading && <Loader />}
        <Outlet />
      </div>

      {show && (
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
      )}
    </div>
  );
};

export default RootLayout;
