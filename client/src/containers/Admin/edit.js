import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getBook, updateBook, clearBook, deleteBook} from '../../actions';

class EditBook extends PureComponent {

    state = {
        formData: {
            _id: this.props.match.params.id,
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
        this.props.dispatch(updateBook(this.state.formData));
    };


    componentWillMount() {
        this.props.dispatch(getBook(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearBook());
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        const book = nextProps.books.book;
        this.setState({
            formData: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        });
    }

    deletePost = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id));
    };

    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user_reviews');
        }, 1000);
    };

    render() {
        const data = this.state.formData;
        const books = this.props.books;

        return (
            <div className="rl_container article">
                {
                    books.updateBook ?
                        <div className="edit_confirm">
                            Post updated, <Link to={`/books/${books.book._id}`}>
                                Click here to see your post
                            </Link>
                        </div>
                        : null
                }
                {
                    books.postDeleted ?
                        <div className="red_tag">
                            Post Deleted
                            {this.redirectUser()}
                        </div>
                        : null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit a review</h2>
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

                    <button type="submit">Edit review</button>

                    <div className="delete_post">
                        <div
                            className="button"
                            onClick={this.deletePost}>Delete review</div>
                    </div>
                    
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

export default connect(mapStateToProps)(EditBook);
