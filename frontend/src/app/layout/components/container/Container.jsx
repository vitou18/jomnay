import React, { useEffect, useState } from "react";
import Button from "../../../utils/Button";
import { TbLogout2 } from "react-icons/tb";
import useAuth from "../../../module/Auth/core/action";
import Modal from "../../../utils/Modal";
import Action from "../../../utils/Action";

const Container = ({ title, children }) => {
  const [scrolled, setScrolled] = useState(false);
  const { onLogout } = useAuth();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickModal = () => {
    setShow((pre) => !pre);
  };

  const onClickLogout = async () => {
    await onLogout();
    setShow((pre) => !pre);
  };

  return (
    <div className="bg-purple-600/5 min-h-screen pb-28 md:pb-0">
      <header
        className={`bg-white flex items-center justify-between z-40 p-5 md:p-7 sticky top-0 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_0_16px_-4px_rgba(0,0,0,0.07)]" : ""
        }`}
      >
        <h2 className="text-lg text-slate-900 font-medium md:text-xl">
          {title}
        </h2>

        <Button onClick={onClickModal} icon={TbLogout2} style="logout" />
      </header>

      <main className="p-5 md:p-7 flex flex-col gap-y-7">{children}</main>

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

export default Container;
