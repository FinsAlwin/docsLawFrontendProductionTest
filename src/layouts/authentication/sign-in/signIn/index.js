import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import { login } from "../../../../services/authService";
import { useNavigate, Redirect } from "react-router-dom";
import MDAlert from "components/MDAlert";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (!usernameRegex.test(username)) {
      setError("Username can only contain letters and numbers.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await login(username, password);
      setUsername("");
      setPassword("");
      setLoading(false);
      setError(null);

      navigate(`/authentication`);
    } catch (error) {
      setError("Invalid username or password.");
      setLoading(false);
    }
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      {error && (
        <MDAlert color="error" dismissible>
          {error}
        </MDAlert>
      )}

      <MDBox component="form" role="form" onSubmit={handleLogin}>
        <MDBox mb={2}>
          <MDInput
            type="text"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            color="info"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Sign in
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{" "}
            <MDTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default SignIn;
