
import { BrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
const Route = lazy(() => import("./routes/index"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <Route />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
