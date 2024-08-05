// App.js
'use client';
import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, Select,
    MenuItem,
    InputLabel,
    FormControl, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Grid from '@mui/material/Grid';

// Validation Schema
const schema = yup.object().shape({
    shortName: yup.string().required("Field 1 is required"),
    fullName: yup.string().required("Field 2 is required"),
    category: yup.string().required("Field 3 is required"),
});

function NewForm({ addNew, setAddNew }) {
    const [entries, setEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteIndex, setDeleteIndex] = useState(null); // New state for deletion
    const [open, setOpen] = useState(false); // Dialog state
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {   // Set default values for controlled components
            shortName: "",
            fullName: "",
            category: "",
        },
    });

    // Handle form submission for adding or editing an entry
    const onSubmit = (data) => {
        if (editIndex !== null) {
            const updatedEntries = [...entries];
            updatedEntries[editIndex] = data;
            setEntries(updatedEntries);
            setEditIndex(null);
            setAddNew(false);
        } else {
            setEntries([...entries, data]);
            setAddNew(false);
        }
        reset();
    };

    // Handle entry edit action
    const handleEdit = (index) => {
        const entry = entries[index];
        setValue("shortName", entry.shortName);
        setValue("fullName", entry.fullName);
        setValue("category", entry.category);
        setEditIndex(index);
        setAddNew(true);
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
        const updatedEntries = entries.filter((_, i) => i !== deleteIndex);
        setEntries(updatedEntries);
        handleClose();
        updatedEntries.length === 0 && setAddNew(true);
    };

    // Filter entries based on search term
    const filteredEntries = entries.filter((entry) =>
        Object.values(entry).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Container>
            <Typography variant="h5" component="h1" gutterBottom>
                Manage Item Group Entries
            </Typography>

            {/* Form Section */}
            {addNew ? (
                <React.Fragment> 
                <Grid item md={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="shortName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Short Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.shortName}
                                    helperText={errors.shortName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
                                />
                            )}
                        />

                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.category}
                                    variant="outlined"
                                >
                                    <InputLabel>Category</InputLabel>
                                    <Select {...field} label="Category">
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Option1">Option 1</MenuItem>
                                        <MenuItem value="Option2">Option 2</MenuItem>
                                        <MenuItem value="Option3">Option 3</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            {editIndex !== null ? "Update" : "Save"}
                        </Button>
                    </form>
                </Grid>
                </React.Fragment>) : (
                <React.Fragment>
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Field 1</TableCell>
                                    <TableCell>Field 2</TableCell>
                                    <TableCell>Field 3</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredEntries.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{entry.shortName}</TableCell>
                                        <TableCell>{entry.fullName}</TableCell>
                                        <TableCell>{entry.category}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleEdit(index)}>Edit</Button>
                                            <Button color="error"
                                                onClick={() => handleOpenDeleteDialog(index)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></React.Fragment>)}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this entry? This action cannot be
                        undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default NewForm;
