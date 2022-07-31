import { Translate } from "@mui/icons-material";
import { textAlign } from "@mui/system";
import React from "react";

export const Container: React.CSSProperties = {
  backgroundColor: "#1f2124",
  position: "absolute",
  top: "49%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#cacaca",
  borderRadius: "4px",
  boxShadow: "5px 5px 5px black",
};

export const Header: React.CSSProperties = {
  backgroundColor: "#3a3d45",
  height: "55px",
  width: "100%",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  boxShadow: "0 5px 10px -6px black",
  borderRadius: "4px",
};

export const HeaderText: React.CSSProperties = {
  color: "#fff",
  fontSize: "20px",
  margin: "0 0 0 15px",
};

export const Footer: React.CSSProperties = {
  height: "55px",
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  margin: "0 10px 10px 0",
};

export const ButtonClose: React.CSSProperties = {
  marginTop: "45px",
  height: "35px",
  width: "80px",
  backgroundColor: "#3A3D45",
  marginRight: "10px",
  fontFamily: "Source Sans Pro",
  color: "#fff",
  fontSize: "15px",
};

export const ActionButton: React.CSSProperties = {
  marginTop: "45px",
  height: "35px",
  width: "80px",
  backgroundColor: "#34dfeb",
  fontFamily: "Source Sans Pro",
  color: "black",
  fontSize: "15px",
};

export const Content: React.CSSProperties = {
  padding: "20px",
};

export const PhoneInput: React.CSSProperties = {
  padding: "10px",
  borderRadius: "4px",
  border: "1px solid #0c0c0c",
  boxShadow: "1px 1px 3px #0c0c0c",
  background: "#0c0c0c",
  color: "#fff",
  width: "50px",
  fontSize: "40px",
  textAlign: "center",
  margin: "0 1px",
  height: "70px",
};

export const PhoneDropdown: React.CSSProperties = {
  borderRadius: "4px",
  border: "1px solid #0c0c0c",
  boxShadow: "1px 1px 3px #0c0c0c",
  background: "#0c0c0c",
  color: "#fff",
  width: "200px",
  height: "70px",
  textOverflow: "clip",
};
