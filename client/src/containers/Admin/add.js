import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {addBook, clearNewBook} from '../../actions/index';

class AddBook extends Component {

    state = {
        formData: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '1',
            price: '',
        }
    };

    handleInput = (event, name) => {
        const newFormData = {
            ...this.state.formData
        };

        newFormData[name] = event.target.value;

        this.setState({
            formData: newFormData
        });
    };

    submitForm = (e) => {
        e.preventDefault();

        this.props.dispatch(addBook({
            ...this.state.formData,
            ownerId: this.props.user.login.id
        }));
    };

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Cool!!!
                <Link to={`/books/${book.bookId}`}>
                    Click the link to see the post
                </Link>
            </div>
            :null
    );


    componentWillUnmount() {
        this.props.dispatch(clearNewBook());
    }

    render() {
        const data = this.state.formData;
        return (
            <div className="rl_container article">
                <form onSubmit={this.submitForm}>
                    <h2>Add a review</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={data.name}
                            onChange={(event) => this.handleInput(event, 'name')}/>

                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={data.author}
                            onChange={(event) => this.handleInput(event, 'author')}/>

                    </div>

                    <textarea
                        value={data.review}
                        onChange={(event) => this.handleInput(event, 'review')}/>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter pages"
                            value={data.pages}
                            onChange={(event) => this.handleInput(event, 'pages')}/>
                    </div>

                    <div className="form_element">
                        <select
                            value={data.rating}
                            onChange={(event) => this.handleInput(event, 'rating')}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={data.price}
                            onChange={(event) => this.handleInput(event, 'price')}/>
                    </div>

                    <button type="submit">Add review</button>

                    {
                        this.props.books.newBook ?
                            this.showNewBook(this.props.books.newBook)
                            :null
                    }

                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    };
};

export default connect(mapStateToProps)(AddBook);
