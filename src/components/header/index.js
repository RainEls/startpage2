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

function HeaderItem(menuItem) {
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
      key={menuItem.title}
      onMouseEnter={menuItem.submenu.length > 0 ? handleClick : null}
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
        href={menuItem.url}
        onClick={menuItem.submenu.length > 0 ? handleClick : null}
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
            backgroundColor: menuItem.underlineColor,
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
            {menuItem.title}
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
              transform: "translateX(0px) translateY(20px)",
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
          {menuItem.submenu.map((menu, index) => {
            return (
              <Link
                key={menu.title}
                href={menu.url}
                style={{ textDecoration: "none" }}
                sx={{
                  color: "inherit",
                }}
              >
                <MenuItem
                  key={menu.title}
                  onClick={handleClose}
                  sx={{
                    pointerEvents: "auto",
                  }}
                >
                  {menu.title}
                </MenuItem>
              </Link>
            );
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
          return HeaderItem(menu);
        })}
      </ButtonGroup>
    </Toolbar>
  );
}

export default HeaderKiosk;
