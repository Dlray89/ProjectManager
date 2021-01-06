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
  Dialog,
  DialogContent,
  Button,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import EnhancedTable from "../src/UI/enhancedTable";

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
  total,
  search
) => {
  return {
    name,
    date,
    features,
    service,
    complexity,
    platform,
    users,
    total,
    search,
  };
};

const ProjectManager = () => {
  const classes = useStyles();
  const theme = useTheme();

  const platFromOptions = ["Web", "iOS", "Android", "Custom Software"];
  var featureOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Push Notification",
  ];

  var websiteOptions = ["Basic", "Interactive", "E-Commerce"];

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
  const [search, setSearch] = useState("");
  const [page, setPage] = React.useState(0);
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [rows, setRows] = useState([
    createData(
      "David Ray",
      "1/4/2020",
      "Mobile App",
      "E-Commerce",
      "Easy",
      "And",
      "0-10",
      "$1500",
      true
    ),
    createData(
      "Tony Baker",
      "1/1/2020",
      "iOS",
      "Social Integration, User Feedback",
      "Medium",
      "iOS",
      "10-100",
      "$2500",
      true
    ),
    createData(
      "Adam Lewis",
      "1/2/2020",
      "Website",
      "User Feedback, GPS, Social Integration",
      "High ",
      "N/A",
      "0-10",
      "$1000",
      true
    ),
  ]);

  const addProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yyyy"),
        service,
        features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$${total}`,
        true
      ),
    ]);
    setOpenDialog(false);
    setName("");
    setPlatfrom([]);
    setService("");
    setFeatures("");
    setDate(new Date());
    setComplexity("");
    setFeatures([]);
    setTotal("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);

    const rowData = rows.map((row) =>
      Object.values(row).filter((option) => option !== true && option !== false)
    );
    const matches = rowData.map((row) =>
      row.map((option) =>
        option.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    const newRows = [...rows];
    matches.map((row, index) =>
      row.includes(true)
        ? (newRows[index].search = true)
        : (newRows[index].search = false)
    );
    setRows(newRows);
    setPage(0);
  };

  const servicesQuestion = (
    <React.Fragment>
      <Grid
        item
        style={{
          marginTop: matchesSM ? 20 : null,
          width: matchesSM ? "83%" : null,
        }}
      >
        <Typography variant="h4">Service</Typography>
      </Grid>
      <Grid item>
        <RadioGroup
          aria-label="service"
          name="service"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
            setFeatures([]);
          }}
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
            value="Custom Software"
            label="Custom Software"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </React.Fragment>
  );

  const complexityQuestions = (
    <Grid
      item
      container
      direction="column"
      style={{
        marginTop: matchesSM ? 50 : "5em",
        width: matchesSM ? "90%" : null,
      }}
    >
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
            disabled={service === "Website"}
            classes={{ label: classes.complexity }}
            value="Low"
            label="Low"
            control={<Radio />}
          />

          <FormControlLabel
            disabled={service === "Website"}
            classes={{ label: classes.complexity }}
            value="Medium"
            label="Medium"
            control={<Radio />}
          />

          <FormControlLabel
            disabled={service === "Website"}
            classes={{ label: classes.complexity }}
            value="High"
            label="High"
            control={<Radio />}
          />
        </RadioGroup>
      </Grid>
    </Grid>
  );

  const userQuestion = (
    <Grid
      item
      style={{
        alignSelf: matchesSM ? "center" : "flex-end",
        marginTop: matchesSM ? "3em" : null,
        marginBottom: matchesSM ? "0.45em" : null,
        width: matchesSM ? "87%" : null,
      }}
    >
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
              disabled={service === "Website"}
              classes={{
                label: classes.users,
                root: classes.usersRoot,
              }}
              value="0 - 10"
              label="0 - 10"
              control={<Radio />}
            />

            <FormControlLabel
              disabled={service === "Website"}
              classes={{
                label: classes.users,
                root: classes.usersRoot,
              }}
              value="10 - 100"
              label="10 - 100"
              control={<Radio />}
            />

            <FormControlLabel
              disabled={service === "Website"}
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
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid
        container
        direction="column"
        alignItems={matchesSM ? "center" : null}
      >
        <Grid
          style={{ marginTOp: "2em", marginLeft: matchesSM ? 0 : "5em" }}
          item
        >
          <Typography variant="h1"> Projects</Typography>
        </Grid>

        <Grid item>
          <TextField
            value={search}
            onChange={handleSearch}
            placeholder="Search Project details or Create a new entry"
            style={{
              width: matchesSM ? "25em" : "35em",
              marginLeft: matchesSM ? 0 : "5em",
            }}
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

        <Grid
          item
          style={{ marginLeft: matchesSM ? 0 : "5em", marginRight: "2em " }}
        >
          <FormGroup row>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              justify={matchesSM ? "center" : null}
            >
              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={websiteChecked}
                      color="primary"
                      onChange={() => setWebsiteCheck(!websiteChecked)}
                    />
                  }
                  label="Websites"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={iosChecked}
                      color="primary"
                      onChange={() => setIosCheck(!iosChecked)}
                    />
                  }
                  label="iOS"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  style={{ marginRight: matchesSM ? 0 : "5em" }}
                  control={
                    <Switch
                      checked={androidChecked}
                      color="primary"
                      onChange={() => setAndroidCheck(!androidChecked)}
                    />
                  }
                  label="Android"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>

              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={softwareChecked}
                      color="primary"
                      onChange={() => setSoftwareCheck(!softwareChecked)}
                    />
                  }
                  label="Software"
                  labelPlacement={matchesSM ? "end" : "start"}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Grid
          item
          style={{
            marginBottom: matchesMd ? "40em" : "35em",
            marginTop: "5em",
            maxWidth: "100%",
          }}
        >
          <EnhancedTable
            websiteChecked={websiteChecked}
            setWebsiteCheck={setWebsiteCheck}
            iosChecked={iosChecked}
            setIosCheck={setIosCheck}
            androidChecked={androidChecked}
            setAndroidCheck={setAndroidCheck}
            softwareChecked={softwareChecked}
            setSoftwareCheck={setSoftwareCheck}
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
          />
        </Grid>

        <Dialog
          style={{ marginTop: "6em" }}
          fullWidth
          maxWidth={"md"}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullScreen={matchesSM}
          style={{ zIndex: 1302 }}
        >
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              direction={matchesSM ? "column" : "row"}
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems={matchesSM ? "center" : null}
                  sm
                >
                  <Hidden mdUp>{servicesQuestion}</Hidden>

                  <Hidden mdUp>{userQuestion}</Hidden>
                  <Hidden mdUp>{complexityQuestions}</Hidden>

                  <Grid item style={{ marginTop:matchesSM ? '3em' : null ,marginBottom:matchesSM ? 0 : "3em" }}>
                    <TextField
                      id="name"
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth={!matchesSM}
                      
                    />
                  </Grid>
                  <Grid
                    item
                    container
                    style={{ marginTop: matchesSM ? 50 : "5em" }}
                    alignItems={matchesSM ? "center" : null}
                    direction="column"
                  >
                    <Hidden smDown>{servicesQuestion}</Hidden>

                    <Grid item style={{ marginTop: matchesSM ? '1em' : "5em",  }}>
                      <Select
                        disabled={service === "Website"}
                        style={{ width:matchesSM ? "12em" :"12em", fontSize: matchesSM ? '1.3em' : null }}
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
                  <Grid item style={{ marginTop: matchesSM ? 50 : null }}>
                    <KeyboardDatePicker
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      style={{ width:matchesSM ? '16em': "16em", fontSize: matchesSM ? "1em" : null }}
                    />
                  </Grid>

                  <Grid item style={{ marginBottom:matchesSM ? 0 : "7.7em" }}>
                    <Hidden smDown>{complexityQuestions}</Hidden>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item style={{ marginTop: matchesSM ? '3em' : null }}>
                <Grid
                  item
                  container
                  alignItems={matchesSM ? "Center" : null}
                  direction="column"
                  sm
                >
                  <Grid item style={{ marginBottom:matchesSM ? 0 : "3em" }}>
                    <TextField
                      style={{ width:matchesSM ? '17em':  "16em" }}
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
                  <Hidden smDown>{userQuestion}</Hidden>

                  <Grid item style={{ marginTop: "5em" }}>
                    <Select
                      style={{ width: "12em" }}
                      labelId="features"
                      id="features"
                      multiple
                      displayEmpty
                      MenuProps={{
                        style: {
                          zIndex: 1310,
                        },
                      }}
                      value={features}
                      renderValue={
                        features.length > 0 ? undefined : () => "Features"
                      }
                      onChange={(e) => setFeatures(e.target.value)}
                    >
                      {service === "Website"
                        ? (featureOptions = websiteOptions)
                        : null}
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
                        service.length === 0 ||
                        features.length === 0 ||
                        features.length > 1
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
