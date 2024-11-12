// src/components/DragDrop.tsx
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableImage from "./DraggableImage";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ViewEdit from "./ViewEdit";
import { Room } from "../types/tableTypes";  
const DragDropArea: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Room 1",
      minCovers: 1,
      maxCovers: 4,
      images: [],
      tables: [],
    },
  ]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  React.useEffect(() => {
    const savedRooms = JSON.parse(localStorage.getItem("rooms") || "[]");
    if (savedRooms.length > 0) {
      setRooms(savedRooms);
      setCurrentRoomIndex(savedRooms.length - 1);
    }
  }, []);

  const handleAddRoom = () => {
    setRooms((prevRooms) => {
      const newRooms = [
        ...prevRooms,
        {
          id: String(prevRooms.length + 1),
          name: `Room ${prevRooms.length + 1}`,
          minCovers: 1,
          maxCovers: 4,
          images: [],
          tables: [],
        },
      ];
      setCurrentRoomIndex(newRooms.length - 1);
      return newRooms;
    });
  };

  const handleSaveRoom = () => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
    alert("Room layout saved!");
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: { id: string; src: string }) => {
      if (rooms[currentRoomIndex]) {
        const newRooms = [...rooms];
        newRooms[currentRoomIndex].images.push(item.src);
        setRooms(newRooms);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleMoreOptions = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewTable = () => {
    setIsEditMode(false);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const handleEditTable = () => {
    setIsEditMode(true);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  const currentRoom = rooms[currentRoomIndex];

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between space-x-4">
        <h3 className="text-xl font-bold border-b-2 border-[#e35248] w-36 pb-2">
          Main Room
        </h3>

        <div className="flex space-x-4 items-center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className="w-36"
            sx={{
              borderColor: "red",
              color: "white",
              background: "linear-gradient(to right, black, red)",
              "&:hover": {
                background: "linear-gradient(to right, red, black)",
              },
            }}
            onClick={handleAddRoom}
          >
            Add Room
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            sx={{
              borderColor: "black",
              color: "black",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
            className="w-36"
            onClick={handleSaveRoom}
          >
            Save Room
          </Button>
          <img src="/menu.png" onClick={handleMoreOptions} style={{ width: '40px', height: '50px' }} />

        </div>
      </div>

      <div
        ref={drop}
        className="border-2 border-dashed p-4 w-full h-96 flex flex-wrap items-center justify-center relative"
        style={{
          backgroundColor: isOver ? "rgba(0, 128, 0, 0.1)" : "white",
          backgroundImage:
            "radial-gradient(circle, #d1d1d1 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      >
        {currentRoom?.images?.map((src: string, index: number) => (
          <DraggableImage key={index} src={src} id={String(index)} />
        ))}
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleViewTable}>View Table</MenuItem>
        <MenuItem onClick={handleEditTable}>Edit Table</MenuItem>
      </Menu>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>{isEditMode ? "Edit Table" : "View Table"}</DialogTitle>
        <DialogContent>
          <ViewEdit
            isEditMode={isEditMode}
            currentRoom={currentRoom}
            saveTable={(updatedRoom: Room) => {
              const newRooms = [...rooms];
              newRooms[currentRoomIndex] = updatedRoom;
              setRooms(newRooms);
              localStorage.setItem("rooms", JSON.stringify(newRooms));
              setOpenEditDialog(false);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DragDropArea;
