import React, { ReactNode } from 'react';
import Draggable from 'react-draggable';

interface DraggableFloatComponentProps {
  children: ReactNode;
  width?: string;
  height?: string;
  defaultPosition?: { x: number; y: number };
}

const DraggableFloatComponent: React.FC<DraggableFloatComponentProps> = ({ 
  children, 
  width = "400px", 
  height = "300px", 
  defaultPosition = { x: 0, y: 0 } 
}) => {
  const style = {
    width,
    height,
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    cursor: "move",
  };

  return (
    <Draggable defaultPosition={defaultPosition}>
      <div style={style}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableFloatComponent;
