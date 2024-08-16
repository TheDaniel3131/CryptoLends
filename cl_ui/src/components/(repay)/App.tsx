// App.tsx or wherever your routes are defined

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Repayment from "../(repay)/Repayment";
import RepaymentDetails from "../(repay)/RepaymentDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Repayment />} />
        <Route path="/repayments/:id" element={<RepaymentDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
