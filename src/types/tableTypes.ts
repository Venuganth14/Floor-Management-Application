import { ReactNode } from "react";

export interface Table {
    status: ReactNode;
    id: string;
    name: string;
    minCovers: number;
    maxCovers: number;
    width: number;
    height: number;
    rotation: number; 
    isActive: boolean;
    x: number; 
    y: number; 
  }
  
  export interface Room {
    images: any;
    minCovers: number;   // Correctly defined as a number
    maxCovers: number; 
    id: string;
    name: string;
    tables: Table[];
  }
  