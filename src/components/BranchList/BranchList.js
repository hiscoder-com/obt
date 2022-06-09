import { MenuItem, TextField } from '@material-ui/core';
import React from 'react';

function BranchList({ branches }) {
  return <><TextField select value={branches[0]} > {branches.map((el)=>(<MenuItem key={el} value={el}>el</MenuItem>))}<TextField /></>
}

export default BranchList;
