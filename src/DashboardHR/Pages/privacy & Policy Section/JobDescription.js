import React, { useEffect, useState } from 'react';
import axios from "axios";
import {
  Paper,
  Typography,
  Divider,
  Box,
  Stack,
  TextField,
  Button,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from "sweetalert2";
import { baseUrl } from '../../../Api/BaseUrl';
import { useNavigate } from "react-router-dom";

export default function JobDescription() {
  const [jobList, setJobList] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getDataList = () => {
    axios
      .get(`${baseUrl}/alljobDescription`)
      .then((response) => {
        console.log(response.data.Details);
        setRows(response.data.details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataList();
  }, []);

  const renderHTML = (html) => {
    return { __html: html };
  };
  const navigate = useNavigate();
    const addJobsData = () => {
      navigate("/admin/AddJobDescription");
    };
    const deleteUser = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          deleteApi(id);
        }
      });
    };
    const deleteApi = (id) => {
      let deleteId = id;
      axios
        .delete(`${baseUrl}deleteJob_Description/${deleteId}`)
        .then((response) => {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          getDataList();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Jobs List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search"
            id="outlined-size-small"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {/* Search input adornments can go here */}
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button
            className="global_button"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={addJobsData} 
          >
            Add Job
          </Button>
        </Stack>

        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "60px" }}>
                  Job Title
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Job Description
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Responsibilities
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                  >
                    <TableCell align="left">{i + 1}</TableCell>
                    <TableCell>{row.jobTitle}</TableCell>
                    <TableCell align="left" dangerouslySetInnerHTML={renderHTML(row.job_Description)} />
                    <TableCell align="center" dangerouslySetInnerHTML={renderHTML(row.Responsibilities ? row.Responsibilities : "_")}/>
                    <TableCell align="left">
                      <DeleteForeverIcon
                        onClick={() => {
                          deleteUser(row._id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
    </div>
  );
}
