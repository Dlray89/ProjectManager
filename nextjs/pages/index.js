import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  useTheme,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  Button,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {format} from 'date-fns'

import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  service: {
    fontWeight: 300,
  },
  complexity: {
    fontWeight: 300,
  },
  usersRoot: {
    marginRight: 0,
  },
  users: {
    fontWeight: 300,
  },
  button: {
    color: "fff",
    background: theme.palette.common.orange,
    borderRadius: 50,
    textTransform: "none",
    "&:hover": {
      background: theme.palette.secondary.light,
    },
  },
}));

const createData = (
  name,
  date,
  service,
  features,
  complexity,
  platform,
  users,
  total
) => {
  return { name, date, features, service, complexity, platform, users, total };
};

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();

  const platFromOptions = ["Web", "iOs", "Android"];
  const featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Push Notification",
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [websiteChecked, setWebsiteCheck] = useState(false);
  const [iosChecked, setIosCheck] = useState(false);
  const [androidChecked, setAndroidCheck] = useState(false);
  const [softwareChecked, setSoftwareCheck] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [total, setTotal] = useState("");
  const [service, setService] = useState("");
  const [complexity, setComplexity] = useState("");
  const [users, setUsers] = useState("");
  const [platforms, setPlatfrom] = useState([]);
  const [features, setFeatures] = useState([]);

  const [rows, setRows] = useState([
    createData(
      "David Ray",
      "1/4/2020",
      "Website",
      "E-Commerce",
      "N/A",
      "Standard Website",
      "0-10",
      "$1500"
    ),
    createData(
      "Tony Baker",
      "1/1/2020",
      "Front-End Application",
      "Social Integration, User Feedback",
      "Medium",
      "Web Application",
      "10-100",
      "$2500"
    ),
    createData(
      "Adam Lewis",
      "1/2/2020",
      "Website",
      "User Feedback, GPS, Social Integration",
      "High ",
      "Web Applcation",
      "0-10",
      "$1000"
    ),
  ]);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, 'MM/dd/yyyy'),
        service,
        features.join(", "),
        complexity,
        platforms.join(", "),
        users,
        total
      ),
    ]);
    setOpenDialog(false)
    setName('')
    setPlatfrom([])
    setService('')
    setFeatures('')
    setDate(new Date())
    setComplexity('')
    setFeatures([])
    setTotal('')
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container direction="column">
        <Grid style={{ marginTOp: "2em", marginLeft: "5em" }} item>
          <Typography variant="h1"> Projects</Typography>
        </Grid>

        <Grid item>
          <TextField
            placeholder="Search Project details or Create a new entry"
            style={{ width: "35em", marginLeft: "5em" }}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  style={{ cursor: "pointer" }}
                  position="end"
                  onClick={() => setOpenDialog(true)}
                >
                  <AddIcon style={{ fontSize: 30 }} color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item style={{ marginLeft: "5em", marginRight: "2em " }}>
          <FormGroup row>
            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={websiteChecked}
                  color="primary"
                  onChange={() => setWebsiteCheck(!websiteChecked)}
                />
              }
              label="Websites"
              labelPlacement="start"
            />

            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={iosChecked}
                  color="primary"
                  onChange={() => setIosCheck(!iosChecked)}
                />
              }
              label="iOS"
              labelPlacement="start"
            />

            <FormControlLabel
              style={{ marginRight: "5em" }}
              control={
                <Switch
                  checked={androidChecked}
                  color="primary"
                  onChange={() => setAndroidCheck(!androidChecked)}
                />
              }
              label="Android"
              labelPlacement="start"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={softwareChecked}
                  color="primary"
                  onChange={() => setSoftwareCheck(!softwareChecked)}
                />
              }
              label="Software"
              labelPlacement="start"
            />
          </FormGroup>
        </Grid>
        <Grid item container justify="flex-end" style={{ marginTop: "5em" }}>
          <Grid item style={{ marginRight: 75 }}>
            <FilterListIcon color="secondary" style={{ fontSize: 50 }} />
          </Grid>
        </Grid>
        <Grid item style={{ marginBottom: "15em" }}>
          <TableContainer elevation={0} component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Complexity</TableCell>
                  <TableCell align="center">Platforms</TableCell>
                  <TableCell align="center">Users</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.service}</TableCell>
                    <TableCell align="center" style={{ maxWidth: "5em" }}>
                      {row.features}
                    </TableCell>
                    <TableCell align="center">{row.complexity}</TableCell>
                    <TableCell align="center">{row.platform}</TableCell>
                    <TableCell align="center">{row.users}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Dialog
          fullWidth
          maxWidth={'md'}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item style={{ marginBottom: "3em" }}>
                    <TextField
                      id="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item container direction="column">
                    <Grid item>
                      <Typography variant="h4">Service</Typography>
                    </Grid>
                    <Grid item>
                      <RadioGroup
                        aria-label="service"
                        name="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Website"
                          label="Website"
                          control={<Radio />}
                        />

                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Mobile App"
                          label="Mobile App"
                          control={<Radio />}
                        />

                        <FormControlLabel
                          classes={{ label: classes.service }}
                          value="Custom software"
                          label="Custom software"
                          control={<Radio />}
                        />
                      </RadioGroup>
                    </Grid>

                    <Grid item style={{ marginTop: "5em" }}>
                      <Select
                        style={{ width: "12em" }}
                        labelId="platforms"
                        id="platforms"
                        multiple
                        displayEmpty
                        value={platforms}
                        renderValue={
                          platforms.length > 0 ? undefined : () => "Platforms"
                        }
                        onChange={(e) => setPlatfrom(e.target.value)}
                      >
                        {platFromOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid
                  alignItems="center"
                  item
                  container
                  direction="column"
                  sm
                  style={{ marginTop: 16 }}
                >
                  <Grid item style={{ marginBottom: "3em" }}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      style={{ width: "16em" }}
                    />
                  </Grid>

                  <Grid item style={{ marginBottom: "7.7em" }}>
                    <Grid item container direction="column">
                      <Grid item>
                        <Typography variant="h4">Complexity</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="complexity"
                          name="complexity"
                          value={complexity}
                          onChange={(e) => setComplexity(e.target.value)}
                        >
                          <FormControlLabel
                            classes={{ label: classes.complexity }}
                            value="Low"
                            label="Low"
                            control={<Radio />}
                          />

                          <FormControlLabel
                            classes={{ label: classes.complexity }}
                            value="Medium"
                            label="Medium"
                            control={<Radio />}
                          />

                          <FormControlLabel
                            classes={{ label: classes.complexity }}
                            value="High"
                            label="High"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid item container direction="column" sm>
                  <Grid item style={{ marginBottom: "3em" }}>
                    <TextField
                      style={{ width: "16em" }}
                      value={total}
                      id="total"
                      label="Total"
                      onChange={(e) => setTotal(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item style={{ alignSelf: "flex-end" }}>
                    <Grid item container direction="column">
                      <Grid item>
                        <Typography variant="h4">Users</Typography>
                      </Grid>
                      <Grid item>
                        <RadioGroup
                          aria-label="serusersvice"
                          name="users"
                          value={users}
                          onChange={(e) => setUsers(e.target.value)}
                        >
                          <FormControlLabel
                            classes={{
                              label: classes.users,
                              root: classes.usersRoot,
                            }}
                            value="0 - 10"
                            label="0 - 10"
                            control={<Radio />}
                          />

                          <FormControlLabel
                            classes={{
                              label: classes.users,
                              root: classes.usersRoot,
                            }}
                            value="10 - 100"
                            label="10 - 100"
                            control={<Radio />}
                          />

                          <FormControlLabel
                            classes={{
                              label: classes.users,
                              root: classes.usersRoot,
                            }}
                            value="100+"
                            label="100+"
                            control={<Radio />}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      style={{ width: "12em" }}
                      labelId="features"
                      id="features"
                      multiple
                      displayEmpty
                      MenuProps={{
                        style: {
                          zIndex: 1302,
                        },
                      }}
                      value={features}
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      onChange={(e) => setFeatures(e.target.value)}
                    >
                      {featureOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "3em" }}>
              <Grid item>
                <Button
                  onClick={() => setOpenDialog(false)}
                  color="primary"
                  style={{ fontWeight: 300 }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={addProject}
                  className={classes.button}
                  variant="contained"
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        service.length === 0
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users.length === 0 ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectManager;
