import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Box, CircularProgress, Hidden, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contacts.operations';
import {
  selectContactsStatus,
  selectFilteredContacts,
} from 'redux/contacts/contacts.selectors';
import { STATUS } from 'constants/status.constants';
import { useEffect } from 'react';
import { ContactsTableRow } from './ContactsTableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'number',
    label: 'Number',
    minWidth: 100,
    align: 'left',
  },
];

export const ContactsTable = () => {
  const status = useSelector(selectContactsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const rows = useSelector(selectFilteredContacts);

  return (
    <>
      {status === STATUS.loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {status === STATUS.success && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Paper sx={{ width: '100%' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <Hidden key={column.id} smDown={column.id === 'number'}>
                        <TableCell
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: 'grey',
                          }}
                        >
                          {column.label}
                        </TableCell>
                      </Hidden>
                    ))}
                    <TableCell
                      key="edit"
                      align="right"
                      sx={{
                        backgroundColor: 'grey',
                      }}
                    >
                      ...
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => {
                    return (
                      //Render rows
                      <ContactsTableRow
                        key={row._id}
                        columns={columns}
                        row={row}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      )}

      {status === STATUS.error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: [2] }}>
          <Typography>Oops! Something went wrong. Please try again.</Typography>
        </Box>
      )}
    </>
  );
};
