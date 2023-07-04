import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import { FaFolder } from "react-icons/fa";
import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Folder({ title }) {
  const [click, setClick] = useState(false);
  const [rename, setRename] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCilck = (e) => {
    if (click) {
      setClick(false);
    } else {
      setClick(true);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent the default browser context menu
    setAnchorEl(e.currentTarget);
  };

  const handleDoubleClick = () => {
    console.log("Double clicked");
  };

  const handleRename = (e) => {
    setAnchorEl(null);
    setRename(true);
  };
  return (
    <>
      <MDBox
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        style={{ cursor: "pointer" }}
        sx={{
          boxShadow: `${click ? 3 : 0}`,
          borderRadius: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleCilck}
        onContextMenu={handleRightClick}
        onDoubleClick={handleDoubleClick}
      >
        <MDBox
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
          }}
        >
          <FaFolder size={50} />
          {!rename && (
            <MDTypography variant="h6" fontWeight="bold">
              {title}
            </MDTypography>
          )}
        </MDBox>
      </MDBox>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Open</MenuItem>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}

// Typechecking props for the DefaultStatisticsCard
Folder.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Folder;
