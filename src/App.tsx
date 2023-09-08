import {
  Route,
  Routes
} from "react-router-dom";
import Layout from './pages/Layout';
import Forecast from './pages/forecast/Forecast';

const App = () => {
  return (
    <Layout>
      <Routes>
          <Route path='/' element={<div style={{ color: '#fff' }}>Welcome</div>} />
          <Route path='/forecast' element={<Forecast />} />
      </Routes>
    </Layout>
  );
}

export default App;
