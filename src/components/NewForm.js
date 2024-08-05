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
    Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const schema = yup.object().shape({
    field1: yup.string().required("Field 1 is required"),
    field2: yup.string().required("Field 2 is required"),
    field3: yup.string().required("Field 3 is required"),
});

function NewForm() {
    const [entries, setEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {   // Set default values for controlled components
            field1: "",
            field2: "",
            field3: "",
        },
    });

    // Handle form submission for adding or editing an entry
    const onSubmit = (data) => {
        if (editIndex !== null) {
            const updatedEntries = [...entries];
            updatedEntries[editIndex] = data;
            setEntries(updatedEntries);
            setEditIndex(null);
        } else {
            setEntries([...entries, data]);
        }
        reset();
    };

    // Handle entry edit action
    const handleEdit = (index) => {
        const entry = entries[index];
        setValue("field1", entry.field1);
        setValue("field2", entry.field2);
        setValue("field3", entry.field3);
        setEditIndex(index);
    };

    // Handle entry deletion
    const handleDelete = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
    };

    // Filter entries based on search term
    const filteredEntries = entries.filter((entry) =>
        Object.values(entry).some((value) =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Manage Entries
            </Typography>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="field1"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Field 1"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.field1}
                            helperText={errors.field1?.message}
                        />
                    )}
                />
                <Controller
                    name="field2"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Field 2"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.field2}
                            helperText={errors.field2?.message}
                        />
                    )}
                />
                <Controller
                    name="field3"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Field 3"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            error={!!errors.field3}
                            helperText={errors.field3?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    {editIndex !== null ? "Update" : "Add New"}
                </Button>
            </form>

            {/* Search Bar */}
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Data Table */}
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
                                <TableCell>{entry.field1}</TableCell>
                                <TableCell>{entry.field2}</TableCell>
                                <TableCell>{entry.field3}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                                    <Button color="error" onClick={() => handleDelete(index)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default NewForm;
