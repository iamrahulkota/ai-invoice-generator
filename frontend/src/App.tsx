import { RouterProvider } from "react-router";
import router from "./router";
import { ThemeProvider } from "./contexts/ThemeProvider";

function App() {
  return (
  <ThemeProvider
    attribute="class"
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange
  >
    <RouterProvider router={router} />
  </ThemeProvider>
  )
}

export default App;