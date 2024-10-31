"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getStudentsById } from "@/store/features/students/studentsSlice";
import PersonalInfo from "@/components/students/detail/personalInfo/index";
import ParentInfo from "@/components/students/detail/parentInfo/index";
import OverView from "@/components/students/detail/personalInfo/overView";
import Documents from "@/components/students/detail/documents/index";
import LoginHistory from "@/components/students/detail/loginHistory/index";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#0097B2",
          // Set your custom color here
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#0097B2", // Set the text color for active tab here
          },
          "&.MuiTab-textColorInherit": {
            color: "red", // Set the text color for inactive tab here
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
  // fontWeight: "bold",
  alignItems: "center",
  fontSize: "15px",
  textDecoration: "none",
  textTransform: "none",
  "& .MuiTab-wrapper": {
    flexDirection: "row",
    alignItems: "center",
  },
};
interface GradeDetailProps {
  id: string | number | null;
}

const StudentDetail: React.FC<GradeDetailProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedStudents, getStudentsByIdLoading, getStudentsByIdError } =
    useSelector((state: RootState) => state.students);

  console.log("selectedStudents", selectedStudents);
  const [value, setValue] = React.useState("personalInfo");
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getStudentsById({ id }));
  }, [dispatch, id]);
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white dark:bg-boxdark md:col-span-1">
          <OverView />
        </div>
        <div className="space-y-0 md:col-span-2">
          <div>
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
                      aria-label="lab API tabs example"
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
                        label="Personal Information"
                        value="personalInfo"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                      <Tab
                        label="Parent Info"
                        value="parentInfo"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                      <Tab
                        label="Documents"
                        value="documents"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                      <Tab
                        label="Login info"
                        value="loginInfo"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                      <Tab
                        label="Class Test Report "
                        value="classTestReport"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="personalInfo"
                    style={{
                      textTransform: "none",
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    <PersonalInfo id={id} />
                  </TabPanel>
                  <TabPanel value="parentInfo">
                    <ParentInfo id={id} />
                  </TabPanel>
                  <TabPanel value="documents">
                    <Documents id={id} />
                  </TabPanel>
                  <TabPanel value="loginInfo">
                    <LoginHistory id={id} />
                  </TabPanel>
                  <TabPanel value="classTestReport">
                    {" "}
                    {/* <OverView /> */}
                  </TabPanel>
                </TabContext>
              </ThemeProvider>
            </Box>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};



export default StudentDetail;
