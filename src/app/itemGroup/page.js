'use client';
import React, { useState } from "react";
import NewForm from '@/components/NewForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useForm } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';

export default function ItemGroup() {
 const [addNew, setAddNew] = useState(true);
 const addNewItem = ()=> {
  setAddNew(true)
 }
  return (
    <>
      {/* Recent Orders */}
      {/* <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <NewForm />
         
        </Paper>
      </Grid> */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5">Item Group</Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={addNewItem}>
          New Item
        </Button>
      </Stack>
      <Card>
        <Grid>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <NewForm addNew={addNew} setAddNew={setAddNew}/>
          </Paper>
        </Grid>
      </Card>
    </>
  );
}
