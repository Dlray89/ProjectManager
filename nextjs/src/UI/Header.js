import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, makeStyles, useTheme, Typography, useMediaQuery } from "@material-ui/core/";


const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <React.Fragment>
    
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar disableGutters>
          
             <Typography style={{color:'white', textAlign:'center', width:'100%'}}>
               Dapnology Management
             </Typography>
          </Toolbar>
        </AppBar>
      
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
