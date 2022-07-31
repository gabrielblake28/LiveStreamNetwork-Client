import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useRef } from "react";
import { useState } from "react";
import * as PhoneCSS from "./PhoneVerificationStyles";
import "./PhoneVerificationStyles.css";
import PhoneCountryData from "./PhoneCountryCodes.json";
import CountrySelect from "./CountrySelect";

type PhoneVerificationProps = {
  HandleClose: Function;
};

PhoneCountryData.sort((a, b) => {
  return a.country_en.localeCompare(b.country_en);
});

export default function PhoneVerification({
  HandleClose,
}: PhoneVerificationProps) {
  const [numbers, setNumbers] = useState<string[]>(
    (new Array(10) as string[]).fill("", 0, 10)
  );

  const [focusIndex, setFocusIndex] = useState(Infinity);

  const refs = useRef<HTMLInputElement | null[]>([]);

  useEffect(() => {
    console.log(focusIndex);
    console.log(refs?.current[focusIndex]);
    refs?.current[focusIndex]?.focus();
  }, [focusIndex]);

  const RenderPhoneInputs = () => {
    return numbers?.map((number, i) => {
      return (
        <input
          ref={(el) => {
            if (refs?.current !== null && el !== null) {
              refs.current[i] = el;
            }
          }}
          value={numbers[i]}
          key={i}
          type="text"
          style={PhoneCSS.PhoneInput}
          onClick={(e) => {
            e.preventDefault();
            setFocusIndex(i);
          }}
          onKeyDown={(e) => {
            if (e.code == "Backspace") {
              e.preventDefault();
              setNumbers((prev) => {
                prev[i] = "";
                return ([] as string[]).concat(prev);
              });
              if (i == 0) {
                return;
              } else {
                setFocusIndex(i - 1);
              }
            }
          }}
          onChange={(e) => {
            e.preventDefault();
            if (e)
              setNumbers((prev) => {
                if (isNaN(parseInt(e.target.value))) {
                  prev[i] = "";
                } else if (e.target.value.length >= 2) {
                  if (isNaN(parseInt(e.target.value[1]))) {
                    prev[i] = "";
                    setFocusIndex(i + 1);
                  } else {
                    prev[i] = e.target.value[1];
                    setFocusIndex(i + 1);
                  }
                } else {
                  if (isNaN(parseInt(e.target.value[0]))) {
                    prev[i] = "";
                    setFocusIndex(i + 1);
                  } else {
                    prev[i] = e.target.value[0];
                    setFocusIndex(i + 1);
                  }
                }

                return ([] as string[]).concat(prev);
              });
          }}
        />
      );
    });
  };
  return (
    <>
      <div style={PhoneCSS.Container}>
        <div style={PhoneCSS.Header}>
          <Typography sx={PhoneCSS.HeaderText}>Add Phone Number</Typography>
        </div>
        <div style={PhoneCSS.Content}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CountrySelect />
            {RenderPhoneInputs()}
          </div>
        </div>
        <div style={PhoneCSS.Footer}>
          <Button
            style={PhoneCSS.ButtonClose}
            onClick={() => {
              HandleClose();
            }}
          >
            Close
          </Button>
          <Button style={PhoneCSS.ActionButton} onClick={() => {}}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
