import React from "react";
import { makeStyles, } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    zIndex: 1302,
    position: "relative"
  },
  adornment: {
    width: "25em",
    verticalAlign: "bottom",
    [theme.breakpoints.down("md")]: {
      width: "21em"
    },
    [theme.breakpoints.down("xs")]: {
      width: "15em"
    }
  },
 
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
    
     
    <Grid containter direction='row'>
    

      <Grid item>
        <Typography style={{color:'white'}}>
          Design by David Ray Jr
        </Typography>
      </Grid>
    </Grid>


      
    </footer>
  );
}
