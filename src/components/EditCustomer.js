import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getCustomerById, updateCustomer } from '../store/customer/action';
import PropTypes from 'prop-types'


const inputStyle = {
    mLeft: {
        marginLeft: '10px'
    }
};

class EditCustomerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getCustomerById(this.props.match.params.id))
    }

    handleSubmit(event) {
        const { dispatch } = this.props
        const customer = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            email: this.state.email
        }
        dispatch(updateCustomer(customer));
        event.preventDefault();
    }
    nextPath(path) {
        this.props.history.push(path);
    }
    render() {
       const { customer, isSubmitted } = this.props
        if (isSubmitted) {
            return <Redirect push to="/" />
        }
        return (
            <div>
                <h2>Edit Customer</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                    First Name:<br />
                    <input type="text" value={customer.firstName}
                        onChange={(e) => this.setState({ firstName: e.target.value })}
                        id="firstName" className="inputWidth" />
                    <br /> Last Name:<br />
                    <input type="text" value={this.state.lastName}
                        onChange={(e) => this.setState({ lastName: e.target.value })}
                        id="lastName" className="inputWidth" />
                    <br /> Phone Number:<br />
                    <input type="text" value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.target.value })}
                        id="phone" className="inputWidth" />
                    <br /> Email Address:<br />
                    <input type="text" value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })}
                        id="email" className="inputWidth" />
                    <br /><br />
                    <input type="button" value="Cancel" onClick={() => this.nextPath('/')} />
                    <input type="submit" style={inputStyle.mLeft} value="Submit" />
                </form>
            </div>
        );
    }
}
EditCustomerComponent.propTypes = {
    customer: PropTypes.object.isRequired,
    isSubmitted: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
    const { customer, isSubmitted } = state.customerReducer.customer !== undefined
        ? state.customerReducer : { customer: {}, isSubmitted: false }
    return { customer, isSubmitted }
}
export default connect(mapStateToProps)(EditCustomerComponent)