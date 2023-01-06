import React from "react";

import menuItems from "../../const/header_menu.json";

import {
  Box,
  Toolbar,
  ButtonGroup,
  ButtonBase,
  Typography,
  Link,
  MenuItem,
  Menu,
  Fade,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

function Dropdown(menu) {
  let [anchorEl, setAnchorEl] = React.useState(null);
  let linkRef = React.useRef();
  let isMenuShown = Boolean(anchorEl);

  let handleClick = (event) => {
    setAnchorEl(linkRef.current);
  };
  let handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Link
      key={menu.title}
      href={menu.url}
      ref={linkRef}
      onMouseEnter={menu.submenu.length > 0 ? handleClick : null}
      onMouseLeave={handleClose}
      style={{ textDecoration: "none" }}
      sx={{
        color: "inherit",
      }}
    >
      <MenuItem
        key={menu.title}
        sx={{
          pointerEvents: "auto",
          justifyContent: "space-between",
          paddingRight: menu.submenu.length ? "0px" : "16px",
        }}
      >

        <Typography variant="h8" color="black">
          {menu.title}
        </Typography>


        {menu.submenu.length ? (
          <ChevronRight />
        ) : (
          <div />
        )}

      </MenuItem>

      <Menu
        anchorEl={anchorEl}
        open={isMenuShown}
        onClose={handleClose}
        elevation={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            minWidth: 120,
            borderRadius: 0,
            transform: "translateX(0px) translateY(0px)",
          },
        }}
        sx={{
          pointerEvents: "none",
        }}
        disableScrollLock={true}
        disableAutoFocusItem={true}
        disableRestoreFocus={true}
        TransitionComponent={Fade}
      >
        {menu.submenu.map((submenu) => {
          return Dropdown(submenu);
        })}
      </Menu>
    </Link>
  );
}

function Category(category) {
  let [anchorEl, setAnchorEl] = React.useState(null);
  let linkRef = React.useRef();
  let isMenuShown = Boolean(anchorEl);

  let handleClick = (event) => {
    setAnchorEl(linkRef.current);
  };
  let handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      key={category.title}
      onMouseEnter={category.submenu.length > 0 ? handleClick : null}
      onMouseLeave={handleClose}
      sx={{
        display: "inline-block",
        position: "relative",
        zIndex: 1,
        padding: "2em",
        margin: "-2em",
      }}
    >
      <Link
        href={category.url}
        onClick={category.submenu.length > 0 ? handleClick : null}
        style={{ textDecoration: "none" }}
        sx={{
          color: "inherit",
          position: "relative",
          mr: 5,

          "&:before": {
            content: "''",
            position: "absolute",
            width: isMenuShown === true ? "100%" : "0",
            height: "2px",
            bottom: "-10px",
            left: "50%",
            transform: "translate(-50%,0%)",
            backgroundColor: category.underlineColor,
            transition: "all 0.3s ease-in-out",
            visibility: isMenuShown === true ? "visible" : "hidden",
          },
          "&:hover:before": {
            visibility: "visible",
            width: "100%",
          },
        }}
      >
        {/* Header menu */}
        <ButtonBase
          ref={linkRef}
          disableRipple={true}
          sx={{ borderRadius: "12px", overflow: "hidden" }}
        >
          {/* <menuItem.icon sx={{ color: "white", mr: 1 }} /> */}
          <Typography color="white" fontSize={14}>
            {category.title}
          </Typography>
        </ButtonBase>

        {/* Sub menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuShown}
          onClose={handleClose}
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              minWidth: 120,
              borderRadius: 0,
              transform: "translateX(0px) translateY(21px)",
            },
          }}
          sx={{
            pointerEvents: "none",
          }}
          disableScrollLock={true}
          disableAutoFocusItem={true}
          disableRestoreFocus={true}
          TransitionComponent={Fade}
        >
          {category.submenu.map((menu) => {
            return Dropdown(menu);
          })}
        </Menu>
      </Link>
    </Box>
  );
}

function HeaderKiosk() {
  return (
    <Toolbar sx={{ justifyContent: "end", alignItems: "center" }}>
      <ButtonGroup variant="outlined">
        {menuItems.map((menu) => {
          return Category(menu);
        })}
      </ButtonGroup>
    </Toolbar>
  );
}

export default HeaderKiosk;
