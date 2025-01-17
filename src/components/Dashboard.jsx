import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { base_api_url } from "../utils/constant";

const Dashboard = () => {
  const [recordData, setRecordData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 50;

  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchData = async (page, search) => {
    try {
      const response = await axios.get(
        `${base_api_url}/auth/records?page=${page}&limit=${limit}&search=${search}`,
        { withCredentials: true } // Pass search query to API
      );
      const records = response?.data?.records || [];
      setRecordData(
        records.map((record, index) => ({
          id: record.id || index + 1,
          Domain: record.Domain || "N/A",
          Niches: record["Niche 1"] || "N/A",
          Traffic: record.Traffic || 0,
          DR: record.DR || 0,
          DA: record.DA || 0,
          Language: record.Language || "N/A",
          Price: record.Price || 0,
          "Spam Score": record["Spam Score"] || 0,
        }))
      );
      setTotalRecords(response?.data?.totalRecords || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Domain", headerName: "Domain", width: 150, editable: false },
    { field: "Niches", headerName: "Niches", width: 150, editable: false },
    { field: "Traffic", headerName: "Traffic", type: "number", width: 160 },
    { field: "DR", headerName: "DR", type: "number", width: 160 },
    { field: "DA", headerName: "DA", type: "number", width: 160 },
    { field: "Language", headerName: "Language", width: 160 },
    { field: "Price", headerName: "Price", type: "number", width: 160 },
    {
      field: "Spam Score",
      headerName: "Spam Score",
      type: "number",
      width: 160,
    },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-[90%] mx-auto shadow-lg rounded-2xl py-5 px-5 mt-5">
        <div className="flex items-center justify-between px-5 my-2">
          <h1 className=" font-bold">All Records</h1>
          <input
            className="px-2 py-1 bg-gray-100 rounded-md outline-none w-[30vw]"
            type="text"
            placeholder="Search Records by Domain Name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={recordData}
            columns={columns}
            rowCount={totalRecords}
            paginationMode="server"
            pagination
            pageSize={limit}
            onPageChange={(newPage) => setCurrentPage(newPage + 1)}
            page={currentPage - 1}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
