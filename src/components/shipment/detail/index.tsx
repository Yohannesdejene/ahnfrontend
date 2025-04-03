"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getShipmentById } from "@/store/features/shipments/shipmentsThunk";
import { CircularProgress, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UpdateShipment from "./updateShipment";
import ShipmentDetail from "./shipmentDetail";
import ShipmentReceipt from "./shipmentReceipt";
import NowAllowedPage from "@/components/common/allowedPage";

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
  type: string;
}

const ShipmentDetailIndex: React.FC<GradeDetailProps> = ({ id, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selectedShipment, getShipmentByIdLoading, getShipmentByIdError } =
    useSelector((state: RootState) => state.shipment);
  const [value, setValue] = React.useState("shipmentDetail");
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const auth = useSelector((state: any) => state?.auth?.permissions);

  const hasDetailPermission =
    type === "air"
      ? auth.some(
          (permission: any) => permission.code === "VIEW_DETAIL_AIR_SHIPMENT",
        )
      : auth.some(
          (permission: any) =>
            permission.code === "VIEW_DETAIL_GROUND_SHIPMENT",
        );

  const hasGenerateInvoicePermission =
    type === "air"
      ? auth.some(
          (permission: any) =>
            permission.code === "GENERATE_INVOICE_AIR_SHIPMENT",
        )
      : auth.some(
          (permission: any) =>
            permission.code === "GENERATE_INVOICE_GROUND_SHIPMENT",
        );

  const hasUpdatePermission =
    type === "air"
      ? auth.some(
          (permission: any) => permission.code === "UPDATE_AIR_SHIPMENT",
        )
      : auth.some(
          (permission: any) => permission.code === "UPDATE_GROUND_SHIPMENT",
        );

  const [loading, setLoading] = useState<boolean>(true);
  // Fetch shipment details by ID
  useEffect(() => {
    if (id) {
      dispatch(getShipmentById(id))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [id, dispatch]);
  return (
    <>
      <div className="container mx-auto p-4" style={{ maxWidth: "90%" }}>
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
                        label="Shipment Detail"
                        value="shipmentDetail"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                      <Tab
                        label="Shipment Invoice"
                        value="receipt"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />

                      <Tab
                        label="Update Shipment"
                        value="updateShipment"
                        className="text-black dark:text-white"
                        sx={{
                          ...tabStyles,
                        }}
                      />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="shipmentDetail"
                    style={{
                      textTransform: "none",
                      textDecoration: "none",
                      color: "#000000",
                    }}
                  >
                    {hasDetailPermission ? (
                      <ShipmentDetail id={id} />
                    ) : (
                      <NowAllowedPage />
                    )}
                  </TabPanel>
                  <TabPanel value="receipt">
                    {hasGenerateInvoicePermission ? (
                      <ShipmentReceipt id={id} type={type} />
                    ) : (
                      <NowAllowedPage />
                    )}{" "}
                  </TabPanel>
                  <TabPanel value="updateShipment">
                    {" "}
                    {hasUpdatePermission ? (
                      <UpdateShipment id={id} type={type} />
                    ) : (
                      <NowAllowedPage />
                    )}
                  </TabPanel>
                </TabContext>
              </ThemeProvider>
            </Box>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default ShipmentDetailIndex;
