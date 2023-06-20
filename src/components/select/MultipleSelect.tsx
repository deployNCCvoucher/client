import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";

interface MultipleSelectInter {
  open?: boolean;
  time: any;
  type: string;
  handleChange: (e: SelectChangeEvent) => void;
}

export const MultipleSelect: React.FC<MultipleSelectInter> = ({
  open,
  time,
  type,
  handleChange,
}) => {
  const getYear = new Date().getFullYear();
  const moths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [0, getYear, getYear - 1, getYear - 2];
  const types = ['30k', '50k', '100k', 0]
  let data = type === "Months" ? moths : type === "Years"? years : types;
  return (
    <FormControl sx={{ m: 1, maxWidth: "200px", width: "100%" }}>
      <InputLabel id="demo-controlled-open-select-label">{type}</InputLabel>
      <Select
        fullWidth
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        value={time === '0'? 'All' : time}
        defaultValue=""
        label={type}
        onChange={handleChange}
        sx={{ ".MuiSelect-select": { p: "11px 14px" } }}
        MenuProps = {{sx: {maxHeight: '200px'}}}
      >
        {data.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item === 0 ? "All" : item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
