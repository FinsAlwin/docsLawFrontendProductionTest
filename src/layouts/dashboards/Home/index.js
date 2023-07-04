import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import FolderCard from "components/FolderCard";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

function Home() {
  const [folders, setFolders] = useState();

  useEffect(() => {
    if (!folders) {
      setFolders(JSON.parse(Cookies.get("folder")));
    }
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2}>
        {folders && (
          <Grid container>
            {folders.map((item, index) => (
              <Grid item xs={4} md={1} lg={1} key={index}>
                <MDBox mt={5} mb={5}>
                  <FolderCard title={item.folderName} />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
