import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ user, isOpen, setIsOpen, onLogout }) {
  const location = useLocation();

  // Public site removed from sidebar
  const menuItems = [
    { name: "Admin Portal", path: "/admin" },
    { name: "Manage Posts", path: "/admin/posts" },
  ];

  const linkClass =
    "flex items-center px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors";
  const activeClass =
    "flex items-center px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-sm transition-colors";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-40 p-4 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Admin Management
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={
                  location.pathname === item.path ? activeClass : linkClass
                }
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Profile & Logout Section */}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm select-none shrink-0">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="truncate min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {user?.email}
              </p>
              <p className="text-[10px] text-gray-400 font-medium">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="px-2.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shrink-0 shadow-sm"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
