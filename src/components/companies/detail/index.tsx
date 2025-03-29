"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getCompanyById } from "@/store/features/company/companiesThunk";
import { CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CompanyDetailTab from "./CompanyDetailTab";
// import CompanyInvoiceTab from "./CompanyInvoiceTab";
// import UpdateCompanyTab from "./UpdateCompanyTab";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#0097B2",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#0097B2",
          },
          "&.MuiTab-textColorInherit": {
            color: "gray",
          },
        },
      },
    },
  },
});

const tabStyles = {
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  alignItems: "center",
  fontSize: "15px",
  textDecoration: "none",
  textTransform: "none",
  "& .MuiTab-wrapper": {
    flexDirection: "row",
    alignItems: "center",
  },
};

interface CompanyDetailProps {
  id: string | number | null;
}

const CompanyDetail: React.FC<CompanyDetailProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedCompany, getCompanyByIdLoading, getCompanyByIdError } =
    useSelector((state: RootState) => state.company);
  const [value, setValue] = useState("companyDetail");

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState<boolean>(true);

  // Fetch company details by ID
  useEffect(() => {
    if (id) {
      dispatch(getCompanyById(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [id, dispatch]);

  return (
    <div className="container mx-auto p-4" style={{ maxWidth: "90%" }}>
      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="space-y-0 md:col-span-2">
          <Box
            sx={{
              width: "100%",
              typography: "body1",
            }}
          >
            <ThemeProvider theme={theme}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="Company Detail Tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    sx={{
                      [`& .MuiTabs-scrollButtons`]: {
                        "&.Mui-disabled": { opacity: 0.3 },
                      },
                    }}
                  >
                    <Tab
                      label="Company Detail"
                      value="companyDetail"
                      className="text-black dark:text-white"
                      sx={{
                        ...tabStyles,
                      }}
                    />
                    <Tab
                      label="Company Invoice"
                      value="invoice"
                      className="text-black dark:text-white"
                      sx={{
                        ...tabStyles,
                      }}
                    />
                    <Tab
                      label="Update Company"
                      value="updateCompany"
                      className="text-black dark:text-white"
                      sx={{
                        ...tabStyles,
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="companyDetail"
                  style={{
                    textTransform: "none",
                    textDecoration: "none",
                    color: "#000000",
                  }}
                >
                  {/* <CompanyDetailTab company={selectedCompany} /> */}
                </TabPanel>
                <TabPanel value="invoice">
                  {/* <CompanyInvoiceTab companyId={id} /> */}
                </TabPanel>
                <TabPanel value="updateCompany">
                  {/* <UpdateCompanyTab company={selectedCompany} /> */}
                </TabPanel>
              </TabContext>
            </ThemeProvider>
          </Box>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
