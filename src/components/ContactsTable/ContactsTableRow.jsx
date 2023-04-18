import { PropTypes } from 'prop-types';
import {
  Hidden,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { ModalDeleteContact } from 'components/ModalDeleteContact/ModalDeleteContact';
import { ModalEditContact } from 'components/ModalEditContact/ModalEditContact';

export const ContactsTableRow = ({ columns, row }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
        {columns.map(column => {
          const value = row[column.id];
          return (
            <Hidden key={column.id} smDown={column.id === 'number'}>
              <TableCell align={column.align}>{value}</TableCell>
            </Hidden>
          );
        })}
        <TableCell key={nanoid()}>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <Tooltip title="Edit contact">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setIsEditModalOpen(true);
                  localStorage.setItem('name', row.name);
                  localStorage.setItem('number', row.number);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete contact">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>

      {isDeleteModalOpen &&
        ReactDOM.createPortal(
          <ModalDeleteContact
            id={row._id}
            open={isDeleteModalOpen}
            setOpen={setIsDeleteModalOpen}
          />,
          document.querySelector('#modal-root')
        )}

      {isEditModalOpen &&
        ReactDOM.createPortal(
          <ModalEditContact
            id={row._id}
            open={isEditModalOpen}
            setOpen={setIsEditModalOpen}
          />,
          document.querySelector('#modal-root')
        )}
    </>
  );
};

ContactsTableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  row: PropTypes.shape({}),
};
