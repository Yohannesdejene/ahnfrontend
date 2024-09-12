import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface ColumnGroupingTableProps {
  columns: Column[];
  rows: any[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  defaultPage?: number;
  tableTitle?: string;
}

const DynamicTable: React.FC<ColumnGroupingTableProps> = ({
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25, 100],
  defaultRowsPerPage = 10,
  defaultPage = 0,
  tableTitle = "Table",
}) => {
  const [page, setPage] = React.useState(defaultPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      {tableTitle && (
        <h2 className="align-center flex justify-center p-16 font-semibold">
          {tableTitle}
        </h2>
      )}
      <hr className="mb-4 mt-4 w-full text-lg font-normal text-normalGray " />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            {/* <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                {tableTitle} Details
              </TableCell>
            </TableRow> */}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 5, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DynamicTable;
