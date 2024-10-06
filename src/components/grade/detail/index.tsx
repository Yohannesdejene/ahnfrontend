"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { CircularProgress, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getGradeById } from "@/store/features/grades/gradeSlice";
import Sections from "@/components/grade/detail/sections/index";
import OverView from "@/components/grade/detail/sections/overView";
import ParentInfo from "@/components/grade/detail/parentInfo";

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

const GradeDetail: React.FC<GradeDetailProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedGrade, getGradeByIdLoading, getGradeByIdError } = useSelector(
    (state: RootState) => state.grades,
  );

  const [value, setValue] = React.useState("sections");
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getGradeById({ id }));
  }, [dispatch, id]);
  return (
    <div className="container mx-auto p-4">
      {/* Main grid */}
      {getGradeByIdLoading && (
        <div className="flex h-screen items-center justify-center">
          <CircularProgress />
        </div>
      )}
      {!getGradeByIdLoading && getGradeByIdError && (
        <Alert severity="error">{getGradeByIdError}</Alert>
      )}
      {!getGradeByIdLoading && selectedGrade && (
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
                          label="Sections"
                          value="sections"
                          className="text-black dark:text-white"
                          sx={{
                            ...tabStyles,
                          }}
                        />
                        <Tab
                          label="Students"
                          value="students"
                          className="text-black dark:text-white"
                          sx={{
                            ...tabStyles,
                          }}
                        />
                        <Tab
                          label="Courses"
                          value="courses"
                          className="text-black dark:text-white"
                          sx={{
                            ...tabStyles,
                          }}
                        />
                      </TabList>
                    </Box>
                    <TabPanel
                      value="sections"
                      style={{
                        textTransform: "none",
                        textDecoration: "none",
                        color: "#000000",
                      }}
                    >
                      <Sections id={id} />
                    </TabPanel>
                    <TabPanel value="students">
                      <ParentInfo id={id} />
                    </TabPanel>
                    <TabPanel value="courses">
                      {/* <Documents id={id} /> */}
                    </TabPanel>
                  </TabContext>
                </ThemeProvider>
              </Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default GradeDetail;
