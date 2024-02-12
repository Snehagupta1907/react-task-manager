
import Switcher from "./Switcher";

const Navbar = () => {
  return (
    <nav className="flex justify-end items-center py-4 px-10 bg-white text-white  border-gray-200 dark:bg-gray-900">
      <div className="flex items-center">
        <Switcher />
      </div>
    </nav>
  );
};

export default Navbar;