import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-reset-cover.jpeg";
import OtpInput from "./OtpInput";

function OtpVerification() {
  const handleOtpChange = (otp) => {
    console.log("OTP:", otp);
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            OTP verification
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            You will receive an OTP in maximum 60 seconds
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} style={{ overflow: "hidden" }}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <OtpInput onChange={handleOtpChange} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Verify
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default OtpVerification;
