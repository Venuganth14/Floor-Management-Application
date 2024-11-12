import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FloorPlan from "./components/FloorPlan";
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import ViewEdit from "./components/ViewEdit";
import { Room } from "./types/tableTypes";  

const App: React.FC = () => {
 
  const currentRoom: Room = {
    id: "1",
    name: "Room 1",
    minCovers: 2,
    maxCovers: 10,
    images: [],
    tables: [],
  };

  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <div className="flex">
            <Sidebar />
            <Routes>
              <Route path="/edit-view" element={<ViewEdit isEditMode={true} currentRoom={currentRoom} saveTable={() => {}} />} />
            </Routes>
            <div className="flex-1 p-4">
              <h1 className="text-center text-4xl font-bold mb-4">
                Floor Management
              </h1>
              <hr className="border-t-2 border-gray-300 mb-6" />
              <FloorPlan />
            </div>
          </div>
        </Router>
      </DndProvider>
    </Provider>
  );
};

export default App;
