import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PartnerLayout from '../layouts/partner-layout';
import Dashboard from '../pages/partner/dashboard';
import LeadsPage from '../pages/partner/leads';
import LeadDetailPage from '../pages/partner/leads/lead-detail';
import AddLeadPage from '../pages/partner/leads/add-lead';
import LendersPage from '../pages/partner/lenders';
import LenderDetailPage from '../pages/partner/lenders/lender-detail';
import TeamsPage from '../pages/partner/teams';
import TeamDetailPage from '../pages/partner/teams/team-detail';
import EmailPage from '../pages/partner/email';
import AnalyticsPage from '../pages/partner/analytics';

const PartnerRoutes: React.FC = () => {
  return (
    <PartnerLayout>
      <Switch>
        <Route exact path="/partner" render={() => <Redirect to="/partner/dashboard" />} />
        <Route exact path="/partner/dashboard" component={Dashboard} />
        
        <Route exact path="/partner/leads" component={LeadsPage} />
        <Route exact path="/partner/leads/add" component={AddLeadPage} />
        <Route exact path="/partner/leads/:id" component={LeadDetailPage} />
        
        <Route exact path="/partner/lenders" component={LendersPage} />
        <Route exact path="/partner/lenders/:id" component={LenderDetailPage} />
        
        <Route exact path="/partner/teams" component={TeamsPage} />
        <Route exact path="/partner/teams/:id" component={TeamDetailPage} />
        
        <Route exact path="/partner/email" component={EmailPage} />
        <Route exact path="/partner/analytics" component={AnalyticsPage} />
      </Switch>
    </PartnerLayout>
  );
};

export default PartnerRoutes;