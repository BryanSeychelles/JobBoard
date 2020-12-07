import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from '../Header'
import Landing from '../Landing'
import FooterIndex from '../Footer/index'
import Inscription from '../Forms/inscription'
import Login from '../Forms/login'
import Error from '../Error'
import Offers from '../Offers'
import ProfilCompany from '../Profil/company'
import ProfilApp from '../Profil/profil'
import appPerOff from '../Admin/appPerOff'
import Company from '../Admin/company'
import FormsOffers from '../Forms/offers'
import offersEdit from '../Forms/offersEdit'
import FormsProfil from '../Forms/profil'
import FormsCompany from '../Forms/company'
import Applicant from '../Admin/applicant';
import '../../App.css';

function App() {
  return (
    <Router className="App">
        <Header/>
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/applicant/profil' component={ProfilApp}/>
            <Route exact path='/company/profil' component={ProfilCompany}/>
            <Route path='/admin/company/offer/' component={appPerOff}/>
            <Route path='/forms/inscription' component={Inscription}/>
            <Route path='/forms/login' component={Login}/>
            <Route exact path='/offers' component={Offers}/>
            <Route exact path='/admin/company' component={Company}/>
            <Route path='/admin/applicant' component={Applicant}/>
            <Route path='/forms/company/offers/edit/' component={offersEdit}/>
            <Route exact path='/forms/company/offers' component={FormsOffers}/>
            <Route exact path='/forms/admin/profil' component={FormsProfil}/>
            <Route exact path='/forms/admin/company' component={FormsCompany}/>
            <Route component={Error}/>
        </Switch>
        <Switch>
        <Route exact path='/' component={FooterIndex}/>
        </Switch>
    </Router>
  );
}

export default App;
