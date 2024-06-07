import { createContext } from "react";
import { MyContextType } from "./types";

const MyContext = createContext<MyContextType | null>(null);

export default MyContext;
