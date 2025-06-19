import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedItems, theme) {
  return {
    fontWeight: selectedItems.some(item => item.title === name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectPlaceholder({
  dataList = [],
  onSelect,
  initialSelectedTitles = [], 
}) {
  const theme = useTheme();
  const [selectedCategories, setSelectedCategories] = React.useState([]);

 
  React.useEffect(() => {
    if (initialSelectedTitles.length > 0 && dataList.length > 0) {
      const pre = dataList.filter(item =>
        initialSelectedTitles.includes(item.title)
      );
      setSelectedCategories(pre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // sin dependencia de dataList ni initialSelectedTitles

  const handleChange = (event) => {
    const value = Array.isArray(event.target.value)
      ? event.target.value
      : [];

    const selectedObjects = value
      .map(id => {
        const f = dataList.find(item => item.id === id);
        return f ? { id: f.id, title: f.title } : null;
      })
      .filter(Boolean);

    setSelectedCategories(selectedObjects);
    onSelect && onSelect(selectedObjects); // 👉 aquí sí avisamos al padre
  };

  return (
    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
      <Select
        multiple
        displayEmpty
        value={selectedCategories.map(item => item.id)}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={(selected) =>
          selected.length === 0
            ? <em>Select categories</em>
            : selectedCategories.map(i => i.title).join(', ')
        }
        MenuProps={MenuProps}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Select categories</em>
        </MenuItem>
        {dataList.map(cat => (
          <MenuItem
            key={cat.id}
            value={cat.id}
            style={getStyles(cat.title, selectedCategories, theme)}
          >
            {cat.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
