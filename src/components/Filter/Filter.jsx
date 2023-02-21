import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { setFilter } from 'redux/filter/filter.slice';
import { TextField } from '@mui/material';
import { selectFilter } from 'redux/filter/filter.selectors';

export const Filter = () => {
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const handleChangeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <TextField
        id="filter"
        label="Find contacts by name"
        variant="outlined"
        value={filter}
        type="text"
        name="filter"
        onChange={handleChangeFilter}
      />
    </Box>
  );
};
