'use client';
import React, { useState } from "react";
import NewForm from '../itemGroup/components/NewForm';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';

export default function ItemGroup() {
 const [isFormVisible, setIsFormVisible] = useState(true);
 const addNewItem = ()=> {
  setIsFormVisible(true)
 }
  return (
    <>
    
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
      {/* <Card> */}
        <Grid item lg={2}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <NewForm isFormVisible={isFormVisible} setIsFormVisible={setIsFormVisible}/>
          </Paper>
        </Grid>
      {/* </Card> */}
    </>
  );
}
