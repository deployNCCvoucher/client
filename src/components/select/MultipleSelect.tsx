import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

interface IProps {
    date: {
        value: number[];
        label: string;
        type: number;
    },
}

export const MultipleSelect: React.FC<IProps> = ({ date }) => {
    const [moths, setMoth] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent<typeof moths>) => {
        setMoth(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const d = new Date();
    return (
        <FormControl sx={{ m: 1, maxWidth: '200px', width: '100%' }}>
            <InputLabel id="demo-controlled-open-select-label" >{date.label}</InputLabel>
            <Select
                fullWidth
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={moths === '' && date.type === 1 ? date.value[d.getMonth()] : moths === '' && date.type === 2 ? d.getFullYear() : moths}
                label="Moth"
                onChange={handleChange}
                sx={{ ".MuiSelect-select": { p: '11px 14px' } }}
            >
                {date.value.map((item, index) => {
                    return (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
}