import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Define the type for a single result
interface Result {
  awb: string;
  status: "success" | "failed"; // Restrict status to specific values
  message: string;
}

// Define the props for the ResultsTable component
interface ResultsTableProps {
  results: any; // Array of Result objects
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>AWB</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results &&
            results.length > 0 &&
            results.map((result: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {result.awb}
                </TableCell>
                <TableCell align="right">
                  <span
                    style={{
                      color: result.status === "failed" ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    {result.status}
                  </span>
                </TableCell>
                <TableCell align="right">{result.message}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResultsTable;
