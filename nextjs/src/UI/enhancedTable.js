import React, { useState } from "react";
import PropTypes, { array } from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Button,
  Snackbar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Chip,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", label: "Name" },
  { id: "date", label: "Date" },
  { id: "service", label: "Service" },
  { id: "feature", label: "Feature" },
  { id: "complexity", label: "Complexity" },
  { id: "platform", label: "Platform" },
  { id: "users", label: "Users" },
  { id: "total", label: "Total" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  menu: {
    "&:hover": {
      background: "#fff",
    },
    "&.Mui-focusVisible": {
      background: "#fff",
    },
  },
  totalFilterStyle: {
    fontSize: "2rem",
    color: theme.palette.common.orange,
  },
  dollarSign: {
    fontSize: "1.5rem",
    color: theme.palette.common.orange,
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [undo, setUndo] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setMenuOpen] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    backgroundColor: "#ff3232",
    message: "Row has been deleted",
  });

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const onDelete = () => {
    const newRows = [...props.rows];
    const selectedRows = newRows.filter((row) =>
      props.selected.includes(row.name)
    );
    selectedRows.map((row) => (row.search = false));
    props.setRows(newRows);
    setUndo(selectedRows);
    props.setSelected([]);
    setAlert({ ...alert, open: true });
  };

  const onUndo = () => {
    setAlert({ ...alert, open: false });
    const newRows = [...props.rows];
    const redo = [...undo];
    redo.map((row) => (row.search = true));
    Array.prototype.push.apply(newRows, ...redo);
    props.setRows(newRows);
  };

  const handleTotalFilter = (e) => {
    props.setFilterPrice(e.target.value);

    if (e.target.value !== "") {
      const newRows = [...props.rows];

      newRows.map((row) =>
        eval(
          `${e.target.value} ${
            props.totalFIlter === "=" ? "===" : props.totalFIlter
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );

      props.setRows(newRows);
    }
  };

  const filterChange = (operator) => {
    if (props.filterPrice !== "") {
      const newRows = [...props.rows];
      newRows.map((row) =>
        eval(
          `${props.filterPrice} ${
            operator === "=" ? "===" : operator
          } ${row.total.slice(1, row.total.length)}`
        )
          ? (row.search = true)
          : (row.search = false)
      );
      props.setRows(newRows);
    } else {
      const newRows = [...props.rows];
      newRows.map((row) => (row.search = true));
      props.setRows(newRows);
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {null}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list" onClick={handleClick}>
            <FilterListIcon style={{ fontSize: 50 }} color="secondary" />
          </IconButton>
        </Tooltip>
      )}
      <Snackbar
        open={alert.open}
        ContentProps={{
          style: {
            background: alert.backgroundColor,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={alert.message}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            setAlert({ ...alert, open: false });
            const newRows = [...props.rows];
            const names = [...undo.map((row) => row.name)];
            props.setRows(newRows.filter((row) => !names.includes(row.name)));
          }
        }}
        action={
          <Button onClick={onUndo} style={{ color: "#fff" }}>
            UNDO
          </Button>
        }
      />
      <Menu
        id="simple menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        elevation={0}
        style={{ zIndex: 1302 }}
      >
        <MenuItem classes={{ root: classes.menu }}>
          <TextField
            placeholder="Enter a price to filter"
            value={props.filterPrice}
            onChange={handleTotalFilter}
            InputProps={{
              type: "number",
              startAdornment: (
                <InputAdornment position="start">
                  <span className={classes.dollarSign}>$</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  onClick={() => {
                    props.setTotalFilter(
                      props.totalFIlter === ">"
                        ? "<"
                        : props.totalFIlter === "<"
                        ? "="
                        : ">"
                    );
                    filterChange(
                      props.totalFIlter === ">"
                        ? "<"
                        : props.totalFIlter === "<"
                        ? "="
                        : ">"
                    );
                  }}
                  position="end"
                  style={{ cursor: "pointer" }}
                >
                  <span className={classes.totalFilterStyle}>
                    {props.totalFIlter}
                  </span>
                </InputAdornment>
              ),
            }}
          />
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  chip: {
    marginRight: "2em",
    background: theme.palette.common.blue,
    color: "#fff",
  },
}));

export default function EnhancedTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterPrice, setFilterPrice] = useState("");
  const [totalFIlter, setTotalFilter] = useState(">");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const switcthFilters = () => {
    const {
      websiteChecked,
      iosChecked,
      androidChecked,
      softwareChecked,
    } = props;

    const website = props.rows.filter((row) =>
      websiteChecked ? row.service === "Website" : null
    );

    const Ios = props.rows.filter((row) =>
      iosChecked ? row.platform.includes("iOS") : null
    );

    const android = props.rows.filter((row) =>
      androidChecked ? row.platform.includes("Android") : null
    );

    const software = props.rows.filter((row) =>
      softwareChecked ? row.platform.includes("Custom Software") : null
    );

    if (!websiteChecked && !iosChecked && !androidChecked && !softwareChecked) {
      return props.rows;
    } else {
      let newRows = website.concat(
        Ios.filter((item) => website.indexOf(item) < 0)
      );

      let newRows2 = newRows.concat(
        android.filter((item) => newRows.indexOf(item) < 0)
      );

      let newRow3 = newRows2.concat(
        software.filter((item) => newRows2.indexOf(item) < 0)
      );

      return newRow3;
    }
  };

  const priceFilters = (switchRows) => {
        if (filterPrice !== '') {
            const newRows = [...switchRows]
            newRows.map((row) =>
        eval(
          `${filterPrice} ${
            totalFIlter === "=" ? "===" : totalFIlter
          } ${row.total.slice(1, row.total.length)}`
        )
          ? row.search === false ? null : (row.search = true)
          : (row.search = false)
      );
      return newRows
        } else {
            return switchRows
        }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <EnhancedTableToolbar
          rows={props.rows}
          setRows={props.setRows}
          selected={selected}
          setSelected={setSelected}
          numSelected={selected.length}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          totalFIlter={totalFIlter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {stableSort(
                priceFilters(switcthFilters()).filter((row) => row.search),
                getComparator(order, orderBy)
              )
                .slice(
                  props.page * rowsPerPage,
                  props.page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell style={{ maxWidth: "5em" }} align="center">
                        {row.features}
                      </TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platform}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={priceFilters(switcthFilters()).filter((row) => row.search).length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <Grid container justify="flex-end">
          <Grid item>
            {filterPrice !== "" ? (
              <Chip
                onDelete={() => {
                  setFilterPrice("");
                  const newRows = [...props.rows];
                  newRows.map((row) => (row.search = true));
                  props.setRows(newRows)
                }}
                className={classes.chip}
                label={
                  totalFIlter === ">"
                    ? `Less than $${filterPrice}`
                    : totalFIlter === "<"
                    ? `Greater Than $${filterPrice}`
                    : `Equal to $${filterPrice}`
                }
              />
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
