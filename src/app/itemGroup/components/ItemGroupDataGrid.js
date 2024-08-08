import React from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
export default function ItemGroupDataGrid(props) {
  const { handleEdit, handleOpenDeleteDialog, filteredData } = props;
  const columns = [
    { field: "shortName", headerName: "Short Name", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <React.Fragment>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button
            color="error"
            onClick={() => handleOpenDeleteDialog(params.row.id)}
          >
            Delete
          </Button>
        </React.Fragment>
      ),
      sortable: false,
      disableColumnMenu: true,
    },
  ];
  return (
    <React.Fragment>
      <DataGrid
        rows={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        pagination
        paginationMode="client"
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
          sorting: {
            sortModel: [{ field: "shortName", sort: "desc" }],
          },
        }}
      />
    </React.Fragment>
  );
}
