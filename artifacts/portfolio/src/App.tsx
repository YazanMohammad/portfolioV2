import { Switch, Route, Router as WouterRouter } from "wouter";
import Portfolio from "@/pages/portfolio";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminProjects from "@/pages/admin/projects";
import AdminSkills from "@/pages/admin/skills";
import AdminExperience from "@/pages/admin/experience";
import AdminMessages from "@/pages/admin/messages";
import NotFound from "@/pages/not-found";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/admin/projects" component={AdminProjects} />
        <Route path="/admin/skills" component={AdminSkills} />
        <Route path="/admin/experience" component={AdminExperience} />
        <Route path="/admin/messages" component={AdminMessages} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}
