import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/system";

const OtpInputContainer = styled("div")({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const OtpDigitInput = styled("input")({
  margin: "2px",
  width: "40px",
  height: "50px",
  flex: 1,
  textAlign: "center",
  border: "0.5px solid #439DF0",
  borderRadius: "8px",
  "&::placeholder": {
    color: "#cccccc",
  },
  "&:focus": {
    outline: "none",
    borderColor: "#439DF0",
    boxShadow: "0 0 0 2px rgba(0, 0, 255, 0.3)",
  },
});

const OtpInput = ({ onChange }) => {
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) {
      return;
    }

    setOtp((prevOtp) => {
      const updatedOtp = prevOtp.split("");
      updatedOtp[index] = value;
      return updatedOtp.join("");
    });

    if (value !== "") {
      // Move focus to the next input when a digit is entered
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      // Prevent the default behavior of the Backspace key
      e.preventDefault();

      if (index > 0) {
        // Move focus to the previous input when backspace is pressed and the current input is empty
        inputRefs.current[index - 1].focus();
      } else {
        // Keep the focus in the current input field (first field) when backspace is pressed and it is empty
        inputRefs.current[index].focus();
      }
    }
  };

  const handlePaste = (e, index) => {
    const pastedData = e.clipboardData.getData("text/plain");
    const digits = pastedData.match(/\d/g);

    if (digits && digits.length === 6) {
      setOtp(digits.join(""));
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const renderInputs = () => {
    const inputs = [];

    for (let i = 0; i < 6; i++) {
      inputs.push(
        <OtpDigitInput
          key={i}
          placeholder="0"
          value={otp[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          maxLength={1}
          ref={(ref) => (inputRefs.current[i] = ref)}
        />
      );
    }

    return inputs;
  };

  return <OtpInputContainer>{renderInputs()}</OtpInputContainer>;
};

OtpInput.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default OtpInput;
