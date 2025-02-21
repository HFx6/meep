import React from "react";
import {
  Plus,
  History,
  BookOpen,
  Printer,
  Settings,
  Grid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


export function Sidebar({
  isSidebarExpanded,
  setSidebarExpanded,
  onNewChat,
  onShowConversations,
}) {
  const sidebarItems = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: "New Chat",
      action: onNewChat,
    },
    {
      icon: <History className="w-5 h-5" />,
      label: "Conversations",
      action: onShowConversations,
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Documents",
      action: () => {},
    },
    {
      icon: <Printer className="w-5 h-5" />,
      label: "Exports",
      action: () => {},
    },
  ];

  return (
    <div
      className={`${
        isSidebarExpanded ? "w-64" : "w-16"
      } bg-[#141414] border-r border-[#232323] flex flex-col items-center py-6 relative transition-all duration-300 ease-in-out`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setSidebarExpanded(!isSidebarExpanded)}
        className="absolute -right-3 top-8 bg-[#232323] rounded-full p-1 text-gray-400 hover:text-gray-200 transition-colors duration-200"
      >
        {isSidebarExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div
        className={`text-lg font-medium text-gray-300 mb-8 ${
          isSidebarExpanded ? "w-full px-6" : ""
        } transition-all duration-200`}
      >
        {isSidebarExpanded ? (
          <div className="flex items-center">
            <span>{"{un}"}</span>
            <span className="ml-2 text-sm text-gray-500">v2.0</span>
          </div>
        ) : (
          <div className="text-center">{"{un}"}</div>
        )}
      </div>

      {/* User Profile */}

      {/* Navigation Items */}
      <div
        className={`flex-1 w-full ${
          isSidebarExpanded ? "px-4" : ""
        } transition-all duration-200`}
      >
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className={`w-full flex items-center ${
              isSidebarExpanded
                ? "px-4 py-3 space-x-3 hover:bg-[#232323] rounded-lg"
                : "justify-center py-6"
            } text-gray-400 hover:text-gray-200 transition-all duration-200`}
          >
            {item.icon}
            {isSidebarExpanded && <span>{item.label}</span>}
          </button>
        ))}
      </div>

      {/* Bottom Actions */}
      <div
        className={`mt-auto w-full ${
          isSidebarExpanded ? "px-4" : ""
        } transition-all duration-200`}
      >
        <button
          className={`w-full flex items-center ${
            isSidebarExpanded ? "px-4 py-3 space-x-3" : "justify-center py-6"
          } text-gray-500 hover:text-gray-300 transition-all duration-200`}
        >
          <Settings className="w-5 h-5" />
          {isSidebarExpanded && <span>Settings</span>}
        </button>
        <button
          className={`w-full flex items-center ${
            isSidebarExpanded ? "px-4 py-3 space-x-3" : "justify-center py-6"
          } text-gray-500 hover:text-gray-300 transition-all duration-200`}
        >
          <Grid className="w-5 h-5" />
          {isSidebarExpanded && <span>Apps</span>}
        </button>
      </div>
    </div>
  );
}
