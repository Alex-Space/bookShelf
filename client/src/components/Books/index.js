import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookWithRewiever} from '../../actions';

class BookView extends Component {

    componentWillMount() {
        this.props.dispatch(getBookWithRewiever(this.props.match.params.id));
    }

    render() {
        return (
            <div>
                book view
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
};

export default connect(mapStateToProps)(BookView);
