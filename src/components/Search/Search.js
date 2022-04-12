import React, { useState } from 'react';
import DialogUI from '../DialogUI/DialogUI';
import SearchDialog from './SearchDialog';

function Search() {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };
  return (
    <>
      <div onClick={() => setOpenSearchDialog(true)} style={{ marginLeft: '10px' }}>
        Search
      </div>
      <DialogUI open={openSearchDialog} title={' '} onClose={handleCloseSearchDialog}>
        <SearchDialog />
      </DialogUI>
    </>
  );
}

export default Search;
