import '@styles/tailwind.css';

import Layout from '@contexts/popup/components/layout';
import Router from '@contexts/popup/Router';

const App = () => (
  <Layout>
    <Router />
  </Layout>
);

export default App;
