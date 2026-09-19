// src/App.jsx
console.log("🟢 STEP 4: App.jsx wrapper evaluating!");

import AppRoutes from "./routes/AppRoutes";
// 🚨 DOUBLE CHECK THIS IMPORT PATH MATCHES YOUR DISK CASE EXACTLY:
import { AuthProvider } from "./context/AuthContext"; 

function App(){
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

// import Login from "./pages/auth/Login";

// function App(){
//   return (
//     <Login />
//   );
// }

// export default App;
