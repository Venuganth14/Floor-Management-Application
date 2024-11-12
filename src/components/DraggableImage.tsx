import React, { useState } from "react";
import { useDrag } from "react-dnd";
import {
  RotateLeft,
  FileCopy,
  Delete,
  ContentCopy,
  DeleteOutline,
  Circle,
  CircleOutlined,
} from "@mui/icons-material";

const DraggableImage: React.FC<{ src: string; id: string }> = ({ src, id }) => {
  const [rotation, setRotation] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id, src },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  const handleDelete = () => {
    alert(`Delete image with ID: ${id}`);
  };

  const handleCopy = () => {
    alert(`Copy image with ID: ${id}`);
  };

  return (
    <div
      ref={drag}
      className="relative flex flex-col items-center"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={handleClick}
    >
      {showOptions && (
        <div
          className="absolute flex flex-row space-x-2 bg-white p-2 shadow-lg"
          style={{ top: "-2.5rem" }}
        >
          <button onClick={handleCopy} className="text-sm">
            <CircleOutlined />
          </button>
          <button onClick={handleCopy} className="text-sm">
            <ContentCopy />
          </button>
          <button onClick={handleDelete} className="text-sm">
            <DeleteOutline />
          </button>
        </div>
      )}
      <img src={src} alt="Draggable" className="w-24 h-24 object-cover mt-4" />
      <div className="flex justify-center mt-2">
        <button onClick={handleRotateLeft} className="text-black p-1 rounded">
          <RotateLeft />
        </button>
      </div>
    </div>
  );
};

export default DraggableImage;
