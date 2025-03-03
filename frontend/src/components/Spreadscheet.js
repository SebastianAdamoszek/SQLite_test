import React, { useState } from "react";
import { Button, Input, Table } from "@/components/ui";
import axios from "axios";

export default function Spreadsheet() {
  const [rows, setRows] = useState(["Row 1"]);
  const [columns, setColumns] = useState(["Column 1"]);
  const [data, setData] = useState({});

  const addRow = () => {
    setRows([...rows, `Row ${rows.length + 1}`]);
  };

  const addColumn = () => {
    setColumns([...columns, `Column ${columns.length + 1}`]);
  };

  const updateData = (row, col, value) => {
    setData({ ...data, [`${row}-${col}`]: value });
  };

  const saveData = async () => {
    try {
      await axios.post("/api/save", { data });
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-2">
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={addColumn}>Add Column</Button>
        <Button onClick={saveData}>Save Data</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            {columns.map((col, colIdx) => (
              <th key={colIdx}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td>{row}</td>
              {columns.map((col, colIdx) => (
                <td key={colIdx}>
                  <Input
                    value={data[`${rowIdx}-${colIdx}`] || ""}
                    onChange={(e) => updateData(rowIdx, colIdx, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
