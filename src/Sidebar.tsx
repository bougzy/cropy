



import React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/system';

interface SidebarProps {
  menus: { name: string; path: string }[];
  handleLogout: () => void; // New prop to handle logout
}

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    backgroundColor: '#333', // Change this to your desired background color
    color: 'white', // Ensure the text color is white
  },
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    color: 'white', // Menu item text color
  },
});

const Sidebar: React.FC<SidebarProps> = ({ menus, handleLogout }) => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List>
        {menus.map((menu) => (
          <ListItem button key={menu.name} component={NavLink} to={menu.path}>
            <StyledListItemText primary={menu.name} />
          </ListItem>
        ))}
        {/* Logout button */}
        <ListItem button onClick={handleLogout}>
          <StyledListItemText primary="Logout" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
