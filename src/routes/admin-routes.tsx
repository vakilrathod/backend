import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AdminLayout from '../layouts/admin-layout';
import Dashboard from '../pages/admin/dashboard';
import LeadsPage from '../pages/admin/leads';
import LeadDetailPage from '../pages/admin/leads/lead-detail';
import AddLeadPage from '../pages/admin/leads/add-lead';
import PartnersPage from '../pages/admin/partners';
import PartnerDetailPage from '../pages/admin/partners/partner-detail';
import AddPartnerPage from '../pages/admin/partners/add-partner';
import LendersPage from '../pages/admin/lenders';
import LenderDetailPage from '../pages/admin/lenders/lender-detail';
import AddLenderPage from '../pages/admin/lenders/add-lender';
import TeamsPage from '../pages/admin/teams';
import TeamDetailPage from '../pages/admin/teams/team-detail';
import AddTeamPage from '../pages/admin/teams/add-team';
import EmailPage from '../pages/admin/email';
import SmsPage from '../pages/admin/sms';
import AnalyticsPage from '../pages/admin/analytics';

const AdminRoutes: React.FC = () => {
  return (
    <AdminLayout>
      <Switch>
        <Route exact path="/admin" render={() => <Redirect to="/admin/dashboard" />} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
        
        <Route exact path="/admin/leads" component={LeadsPage} />
        <Route exact path="/admin/leads/add" component={AddLeadPage} />
        <Route exact path="/admin/leads/:id" component={LeadDetailPage} />
        
        <Route exact path="/admin/partners" component={PartnersPage} />
        <Route exact path="/admin/partners/add" component={AddPartnerPage} />
        <Route exact path="/admin/partners/:id" component={PartnerDetailPage} />
        
        <Route exact path="/admin/lenders" component={LendersPage} />
        <Route exact path="/admin/lenders/add" component={AddLenderPage} />
        <Route exact path="/admin/lenders/:id" component={LenderDetailPage} />
        
        <Route exact path="/admin/teams" component={TeamsPage} />
        <Route exact path="/admin/teams/add" component={AddTeamPage} />
        <Route exact path="/admin/teams/:id" component={TeamDetailPage} />
        
        <Route exact path="/admin/email" component={EmailPage} />
        <Route exact path="/admin/sms" component={SmsPage} />
        <Route exact path="/admin/analytics" component={AnalyticsPage} />
      </Switch>
    </AdminLayout>
  );
};

export default AdminRoutes;