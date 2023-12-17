import PropTypes from 'prop-types';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

const Options = ({ label, name, children, value, onChange }) => {
  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {label}
        </InputLabel>
        <NativeSelect
          defaultValue={value}
          onChange={handleSelectChange}
          inputProps={{
            name: { name },
          }}
        >
          {children}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

Options.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Options;
