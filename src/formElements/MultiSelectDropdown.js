import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import "./MultiSelectDropdown.scss";

function MultiSelectDropdown(props) {
  return (
    <div className="multiselectDropdownContainer">
      <FormControl fullWidth>
        <Select
          id={`multiselect-dropdown-${props.id}`}
          multiple
          displayEmpty={true}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          renderValue={(selected) =>
            selected.length > 0 ? selected.join(", ") : props.emptyValue
          }
          className="multiselectDropdown"
          color="primary"
          variant="outlined"
        >
          {props.options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                checked={props.value.indexOf(option) > -1}
                size="small"
              />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultiSelectDropdown;
