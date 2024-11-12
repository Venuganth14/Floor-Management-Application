import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Table } from "../types/tableTypes";

interface TableState {
  tables: Table[];
}

const initialState: TableState = { tables: [] };

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addTable: (state, action: PayloadAction<Table>) => {
      state.tables.push(action.payload);
    },
    updateTablePosition: (
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) => {
      const table = state.tables.find(
        (table) => table.id === action.payload.id
      );
      if (table) {
        table.x = action.payload.x;
        table.y = action.payload.y;
      }
    },
  },
});

export const { addTable, updateTablePosition } = tableSlice.actions;
export default tableSlice.reducer;
