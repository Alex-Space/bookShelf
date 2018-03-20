import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookWithRewiever} from '../../actions';

class BookView extends Component {

    componentWillMount() {
        this.props.dispatch(getBookWithRewiever(this.props.match.params.id));
    }

    renderBooks = (books) => (
        books.book ?
            <div className="br_container">
                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Review by:</span> {books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>
                <div className="br_review">
                    {books.book.review}
                </div>
            </div>
            : null
    );

    render() {
        const books = this.props.books;
        return (
            <div>
                {this.renderBooks(books)}
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
