import React, { useState, useEffect } from "react";
import { Room } from "../types/tableTypes";  
import { TextField, Button } from "@mui/material";

interface ViewEditProps {
  isEditMode: boolean;
  currentRoom: Room;
  saveTable: (updatedRoom: Room) => void;
}

const ViewEdit: React.FC<ViewEditProps> = ({ isEditMode, currentRoom, saveTable }) => {
  const [minCovers, setMinCovers] = useState<number>(currentRoom.minCovers);
  const [maxCovers, setMaxCovers] = useState<number>(currentRoom.maxCovers);
  const [roomName, setRoomName] = useState<string>(currentRoom.name);

  useEffect(() => {
    if (isEditMode) {
      setMinCovers(currentRoom.minCovers);
      setMaxCovers(currentRoom.maxCovers);
      setRoomName(currentRoom.name);
    }
  }, [isEditMode, currentRoom]);

  const handleSave = () => {
    const updatedRoom = { ...currentRoom, minCovers, maxCovers, name: roomName };
    saveTable(updatedRoom);
  };

  return (
    <div>
      <TextField
        label="Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!isEditMode}
      />
      <TextField
        label="Min Covers"
        type="number"
        value={minCovers}
        onChange={(e) => setMinCovers(Number(e.target.value))}
        fullWidth
        margin="normal"
        disabled={!isEditMode}
      />
      <TextField
        label="Max Covers"
        type="number"
        value={maxCovers}
        onChange={(e) => setMaxCovers(Number(e.target.value))}
        fullWidth
        margin="normal"
        disabled={!isEditMode}
      />
      {isEditMode && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          sx={{ mt: 2 }}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default ViewEdit;
