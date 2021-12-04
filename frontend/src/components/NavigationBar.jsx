import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "../context/UserContext.js";
import logout from "../services/login.js";
import { useRef, useState, useEffect } from "react";

const NavigationBar
