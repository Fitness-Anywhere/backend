import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import ClientHomePage from "./Client/ClientHomepage";
import ClientProfile from "./Client/ClientProfile";
import ClientResults from "./Client/ClientResults";
import InstructorHomePage from "./instructor/InstructorHomePage";
import InstructorSingleClass from "./instructor/InstructorSingleClass";
import ClientSingleClass from "./Client/ClientSingleClass";
import EditClass from "./instructor/EditClass";

import InstructorProfile from "./instructor/InstructorProfile";

const ProtectedMain = () => {
  return (
    <>
      <Route exact path="/account/client/:id">
        <ClientHomePage />
      </Route>
      <Route exact path={`/account/client/:id/:c_id/more-info`}>
        <ClientSingleClass />
      </Route>
      <Route exact path={`/account/client/:id/schedule`}>
        <ClientProfile />
      </Route>
      <Route exact path={`/account/client/:id/:type/results`}>
        <ClientResults />
      </Route>

      <Route exact path="/account/instructor/:id">
        <InstructorHomePage />
      </Route>

      <Route exact path={`/account/instructor/:id/profile`}>
        <InstructorProfile />
      </Route>

      <Route exact path={`/account/instructor/:id/:c_id/more-info`}>
        <InstructorSingleClass />
      </Route>
      <Route exact path={`/account/instructor/:id/edit/:c_id`}>
        <EditClass />
      </Route>
    </>
  );
};

export default ProtectedMain;
