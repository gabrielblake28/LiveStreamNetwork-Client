import React from "react";
import { useEffect } from "react";
import * as PhoneCSS from "./PhoneVerificationStyles";

type PhoneInputVerification = {
  HandleChange: (value: string, index: number) => void;
  Value: string;
  Ref: React.RefObject<HTMLInputElement>;
  Index: number;
};

export function PhoneInput({
  HandleChange,
  Value,
  Ref,
  Index,
}: PhoneInputVerification) {
  return (
    <input
      ref={Ref}
      style={PhoneCSS.PhoneInput}
      type="text"
      value={Value}
      onChange={(e) => {
        HandleChange(e.target.value, Index);
      }}
    />
  );
}
