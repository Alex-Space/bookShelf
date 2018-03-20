import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from '../actions/index';

export default function (ComposedClass) {
    class AuthenticationCheck extends Component {

        state = {
            loading: true
        }

        componentWillMount() {
            this.props.dispatch(auth());
        }

        componentWillReceiveProps(nextProps) {
            this.setState({loading: false});

            if (!nextProps.user.login.isAuth) {

            } else {

            }
        }

        render() {
            if (this.state.loading) {
                return <div className="loader">Loader...</div>
            }
            return(
                <ComposedClass {...this.props} user=""/>
            );
        }
    }
    
    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}
