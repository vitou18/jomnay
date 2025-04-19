import Logo from "./Logo";
import Logout from "./Logout";
import Menu from "./Menu";

const Sidebar = ({ sidebarItems, sideBarShow, logo, onClickModal }) => {
  return (
    <nav
      className={`fixed transition-all duration-300 shadow-[0_0_16px_0_rgba(0,0,0,0.5)] md:shadow-none md:h-screen bottom-5 p-3.5 md:p-0 right-0 rounded-full left-0 mx-auto md:mx-0 md:rounded-none bg-slate-800 w-max gap-x-2.5 md:top-0 flex justify-center md:justify-start ${
        sideBarShow ? "md:-translate-x-72" : "md:translate-x-0"
      } md:flex-col md:gap-y-14 md:w-64 md:bg-slate-900 md:py-7 md:ps-7 transition-transform duration-300 z-40`}
    >
      <Logo logo={logo} />

      <Menu sidebarItems={sidebarItems} />

      <Logout onClick={onClickModal} />
    </nav>
  );
};

export default Sidebar;
