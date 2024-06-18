import { createContext } from "react";
import MatterService from "../services/matter-service";

export const MatterContext = createContext<MatterService | null>(null);
