import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from "../actions/index";
import BookItem from '../widgetsUI/bookItem';

class HomeContainer extends Component {

    componentWillMount() {
        this.props.dispatch(getBooks(1,0,'desc'));
    }

    renderItems = (books) => (
        books.list ? books.list.map(item => (
            <BookItem {...item} key={item._id} />
        )) : null
    );

    loadmore = () => {
        const count = this.props.books.list.length;
        this.props.dispatch(getBooks(1, count, 'desc', this.props.books.list));
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderItems(this.props.books)}
                <div className="loadmore" onClick={this.loadmore}>Load More</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    };
}

export default connect(mapStateToProps)(HomeContainer);

