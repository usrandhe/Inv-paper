"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import DeleteDialog from "./DeleteDialog";
import SearchBar from "./SearchBar";
// import { DataGrid } from "@mui/x-data-grid";
import FormSection from "./FormSection";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../validationSchema";
import ItemGroupDataGrid  from "./ItemGroupDataGrid"
function NewForm({setIsFormVisible }) {
  const [entries, setEntries] = useState([]);
  const [editedEntryIndex, setEditedEntryIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null); // New state for deletion
  const [open, setOpen] = useState(false); // Dialog state

  // const [rowsPerPage, setRowsPerPage] = useState(2); // New state for pagination
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/entries")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
        setFilteredData(data);
      });
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      shortName: "",
      fullName: "",
      category: "",
    },
  });

  // Handle form submission for adding or editing an entry
  const onSubmit = (data) => {
    if (editedEntryIndex !== null) {
      fetch(`http://localhost:3001/entries/${editedEntryIndex}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedEntries = [...entries];
          const entryIndex = updatedEntries.findIndex(
            (entry) => entry.id === editedEntryIndex
          );
          updatedEntries[entryIndex] = data;
          setEntries(updatedEntries);
          setFilteredData(updatedEntries);
          setEditedEntryIndex(null);
          setIsFormVisible(false);
        });
    } else {
      // const newEntry = {
      //   shortName: data.shortName,
      //   fullName: data.fullName,
      //   category: data.category,
      // };
      // console.log(newEntry, data);
      fetch("http://localhost:3001/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setEntries([...entries, data]);
          setFilteredData([...filteredData, data]);
          console.table(entries);
          console.table(filteredData);
          setIsFormVisible(false);
        });
    }
    reset();
  };

  // Handle entry edit action
  const handleEdit = (index) => {
    const entry = index;
    setValue("shortName", entry.shortName);
    setValue("fullName", entry.fullName);
    setValue("category", Number(entry.category));
    setEditedEntryIndex(index.id);
    setIsFormVisible(true);
  };

  // Handle opening the delete confirmation dialog
  const handleOpenDeleteDialog = (index) => {
    setDeleteIndex(index);
    setOpen(true);
  };

  // Handle closing the delete confirmation dialog
  const handleClose = () => {
    setOpen(false);
    setDeleteIndex(null);
  };

  // Handle entry deletion
  const handleDelete = () => {
    fetch(`http://localhost:3001/entries/${deleteIndex}`, {
      method: "DELETE",
    }).then(() => {
      const updatedEntries = entries.filter((_, i) => _.id !== deleteIndex);
      setEntries(updatedEntries);
      setFilteredData(updatedEntries);
      handleClose();
      updatedEntries.length === 0 && setIsFormVisible(true);
    });
  };

  // Filter entries based on search term
  const handleSearch = (searchTerm) => {
    const filteredEntries = entries.filter((entry) =>
      Object.values(entry).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filteredEntries);
  };

  const handleCancel = () => {
    setEditedEntryIndex(null);
    setIsFormVisible(false);
    reset();
  };
  // const columns = [
  //   { field: "shortName", headerName: "Short Name", width: 150 },
  //   { field: "fullName", headerName: "Full Name", width: 150 },
  //   { field: "category", headerName: "Category", width: 150 },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     width: 150,
  //     renderCell: (params) => (
  //       <React.Fragment>
  //         <Button onClick={() => handleEdit(params.row)}>Edit</Button>
  //         <Button
  //           color="error"
  //           onClick={() => handleOpenDeleteDialog(params.row.id)}
  //         >
  //           Delete
  //         </Button>
  //       </React.Fragment>
  //     ), sortable: false, disableColumnMenu: true
  //   },
  // ];
  return (
    <Container>
      <Typography variant="h5" component="h1" gutterBottom>
        Manage Item Group Entries
      </Typography>

      {/* Form Section */}
      {/* {isFormVisible ? ( */}
      {/* <React.Fragment> */}
      <Grid container spacing={2}>
        <Grid md={8}>
          <FormSection
            onSubmit={onSubmit}
            editedEntryIndex={editedEntryIndex}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            setValue={setValue}
            errors={errors}
            handleCancel={handleCancel}
          />{" "}
        </Grid>
      </Grid>
     
      <Grid container spacing={2}>
        <SearchBar onSearch={handleSearch} />
        <div style={{ height: 375, width: "100%" }}>
          {/* <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={rowsPerPage}
            onPageSizeChange={(params) => setRowsPerPage(params.pageSize)}
           
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
          /> */}
          <ItemGroupDataGrid filteredData={filteredData} handleEdit={handleEdit} handleOpenDeleteDialog={handleOpenDeleteDialog} />
        </div>
      </Grid>
     
      {/* Delete Confirmation Dialog */}

      <DeleteDialog
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        deleteIndex={deleteIndex}
        entries={filteredData}
      />
    </Container>
  );
}

export default NewForm;
