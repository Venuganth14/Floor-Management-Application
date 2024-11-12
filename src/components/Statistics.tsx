
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { TableChart, Group, Person, Wifi, Web, TableBarRounded, LanguageOutlined } from '@mui/icons-material'; 
import { Box, Typography, Grid } from '@mui/material'; 

const Statistics: React.FC = () => {
  const tables = useSelector((state: RootState) => state.tables.tables);
  const totalTables = tables.length;
  const totalMinCovers = tables.reduce((acc, table) => acc + table.minCovers, 0);
  const totalMaxCovers = tables.reduce((acc, table) => acc + table.maxCovers, 0);

  const onlineCapacityMin = 3;
  const onlineCapacityMax = 12;

  return (
    <Box
      sx={{
        backgroundColor: '#2c2f38', 
        padding: '5px',
        borderTop: '1px solid gray',
        borderRadius: '2px',
      }}
    >
      
      <Grid container spacing={2} justifyContent="space-between" marginBottom={2}>
      
        <Grid item xs={3} display="flex" alignItems="center" justifyContent="center">
          <TableBarRounded sx={{ marginRight: '8px', fontSize: 16, color: 'white' }} />
          <Typography variant="h6" color="white" sx={ {fontSize: 16}}>
            {totalTables} Tables
          </Typography>
        </Grid>

        
        <Grid item xs={3} display="flex" alignItems="center" justifyContent="center">
          <Group sx={{ marginRight: '8px', fontSize: 16, color: 'white' }} />
          <Typography variant="h6" color="white" sx={ {fontSize: 16}}>
            {totalMinCovers} Min Covers
          </Typography>
        </Grid>

       
        <Grid item xs={3} display="flex" alignItems="center" justifyContent="center">
          <Person sx={{ marginRight: '8px', fontSize: 16, color: 'white' }} />
          <Typography variant="h6" color="white" sx={ {fontSize: 16}}>
            {totalMaxCovers} Max Covers
          </Typography>
        </Grid>

  
        <Grid item xs={3} display="flex" alignItems="center" justifyContent="center">
          <LanguageOutlined sx={{ marginRight: '8px', fontSize: 16, color: 'white' }} />
          <Typography variant="h6" color="white" sx={ {fontSize: 16}}>
            {onlineCapacityMin} - {onlineCapacityMax} Online Capacity
          </Typography>
        </Grid>
      </Grid>

  
    </Box>
  );
};

export default Statistics;
