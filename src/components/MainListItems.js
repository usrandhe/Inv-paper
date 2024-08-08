"use client";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";

import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
export default function MainListItems({ setModuleTitle }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [transactionOpen, setTransactionOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const handleTransactionClick = () => {
    setTransactionOpen(!transactionOpen);
  };

  const handleNavigation = (path, title = "Dashboard") => {
    router.push(path);
    setModuleTitle(title);
  };
  const masterMenu = [
    { text: "Item Group", path: "/itemGroup", id: 1 },
    { text: "Item Master", path: "/itemMaster", id: 2 },
    { text: "Party Master", path: "/partyMaster", id: 3 },
    { text: "Account Group", path: "/accountGroup", id: 4 },
    { text: "Lookup Master", path: "/lookup", id: 5 },
    { text: "With Holding Master", path: "/holdingMaster", id: 6 },
  ];

  return (
    <React.Fragment>
      <ListItemButton onClick={() => handleNavigation("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Masters" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ overflow: "auto" }}>
          <List component="div" disablePadding>
            {masterMenu.map((menu, index) => (
              <ListItemButton
                key={menu.id}
                sx={{ pl: 4 }}
                onClick={() => handleNavigation(menu.path, "Masters")}
              >
                <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Collapse>
      <ListItemButton onClick={handleTransactionClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
        {transactionOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={transactionOpen} timeout="auto" unmountOnExit>
        <Box sx={{ overflow: "auto" }}>
          <List component="div" disablePadding>
            {masterMenu.map((menu, index) => (
              <ListItemButton
                key={menu.id}
                sx={{ pl: 4 }}
                onClick={() => handleNavigation(menu.path, "Transaction")}
              >
                <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
                <ListItemText primary={menu.text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Collapse>
    </React.Fragment>
  );
}
