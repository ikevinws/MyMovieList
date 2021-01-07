import React from 'react';
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
//pages
import Movies from '../pages/Movies/Movies';
import AddMovie from '../pages/AddMovie/AddMovie';
import Register from '../pages/Register/Register';
import Signin from '../pages/Signin/Signin';
import MovieInfo from '../pages/MovieInfo/MovieInfo';
import EditMovie from '../pages/EditMovie/EditMovie';
//components
import Navbar from '../components/Navbar/Navbar';
//contexts
import { useAuthContext } from '../contexts/AuthContext';

const NotAuthRoute = ({ component: Component, isAuth, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => (!isAuth ? <Component {...props} /> : <Redirect to="/movies" />)}
        />
    );
};

const PageRoutes = () => {
    const { isAuth, isAdmin } = useAuthContext();

    return (
        <div className="background-container">
            <Navbar />
            <Router>
                <Switch>
                    <Route exact path="/movies/new" render={(props) => <AddMovie {...props} />} />
                    <Route exact path="/movies" render={(props) => <Movies {...props} />} />
                    <Route path="/movies/:id" render={(props) => <MovieInfo {...props} />} />
                    <NotAuthRoute exact path="/register" component={Register} isAuth={isAuth} />
                    <NotAuthRoute exact path="/signin" component={Signin} isAuth={isAuth} />;
                    <NotAuthRoute path="/movies/edit/:id" component={EditMovie} isAuth={isAdmin} />
                    <Redirect to="/movies" />
                </Switch>
            </Router>
        </div>
    );
};

export default PageRoutes;
