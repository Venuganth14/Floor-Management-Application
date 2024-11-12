import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { HomeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom"; 

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 text-white w-16 flex flex-col items-center py-4">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
          <HomeOutlined
            sx={{
              fontSize: 24,
              background: "linear-gradient(to right, black, red)",
              WebkitBackgroundClip: "text",
              color: "red",
            }}
          />
        </div>

        <Link to="/edit-view"  className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer">
          <img src="/Vector.svg" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
