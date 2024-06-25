"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import LanguageIcon from "./LanguageIcon";
import { useThemeContext } from "../context/ThemeContext";


const AppBarComponent: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isDarkMode } = useThemeContext();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const appBarBackgroundColor = isDarkMode ? "#121212" : "#03acab";

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: appBarBackgroundColor }}
    >
      <Toolbar>
        {/* Stay ID */}
        <Typography
          variant="h6"
          onClick={handleMenu}
          style={{
            cursor: "pointer",
            color: isDarkMode ? "#ffffff" : "#121212",
          }}
        >
          XITASO
        </Typography>
        {/* Menu */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{
            backgroundColor: "transparent",
            marginTop: "32px",
          }}
        >
          <MenuItem
            onClick={handleClose}
            style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          >
            Age: 30
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          >
            Gender: Male
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          >
            ICU Length of Stay: 2 days
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          >
            In Time: 2022-01-01
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          >
            Out Time: 2022-01-03
          </MenuItem>
        </Menu>
        {/* Grow */}
        <div style={{ flexGrow: 1 }} />
        {/* Language Icon */}
        <LanguageIcon />
        {/* ThemeToggle */}
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
