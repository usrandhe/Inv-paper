// FormSection.js
"use client";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";

import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
const FormSection = (props) => {
  const {
    handleSubmit,
    control,
    errors,
    onSubmit,
    editedEntryIndex,
    handleCancel,
  } = props;
  const [lookupData, setLookupData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchLookupData = async () => {
      try {
        const response = await fetch("http://localhost:3001/lookup", {
          signal: abortController.signal,
        });
        const data = await response.json();
        setLookupData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch request was aborted.");
        } else {
          console.error("Error fetching lookup data:", error);
        }
      }
    };
    fetchLookupData();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
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
            {lookupData.length > 0 ? (
              <Select {...field} label="Category">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {lookupData.map((item) => (
                  <MenuItem
                    key={item.LOOKUP_VALUE_ID}
                    value={item.LOOKUP_VALUE_ID}
                  >
                    {item.LOOKUP_VALUE}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Select {...field} label="Category" disabled>
                <MenuItem value="">
                  <em>Loading...</em>
                </MenuItem>
              </Select>
            )}
          </FormControl>
        )}
      />
      <Grid container spacing={2} sx={{mb: 2}}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, ml: 2 }}
        >
          {editedEntryIndex !== null ? "Update" : "Save"}
        </Button>

        <Button
          type="button"
          variant="outlined"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Grid>
    </form>
  );
};

export default FormSection;
