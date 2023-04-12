import ReactDOM from "react-dom/client";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.querySelector(".page") as HTMLElement);
root.render(<RouterProvider router={router} />);
