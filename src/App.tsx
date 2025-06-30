import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import LoginPage from './pages/login';
import AdminRoutes from './routes/admin-routes';
import PartnerRoutes from './routes/partner-routes';
import ProtectedRoute from './components/protected-route';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute path="/admin" role="admin" component={AdminRoutes} />
          <ProtectedRoute path="/partner" role="partner" component={PartnerRoutes} />
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;