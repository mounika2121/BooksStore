import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = item => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors,
    image: item.volumeInfo.imageLinks.thumbnail,
    publishedDate: item.volumeInfo.publishedDate,
    description: item.volumeInfo.description,
    cost: item.saleInfo.saleability,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=books&id=${id}&key=AIzaSyBaHGqMwuREMhGq94Y-2KG-8tsxKq4CpuM&maxResults=40`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const fetchedData = await response.json()
    if (response.ok) {
      const updatedData = this.getFormattedData(fetchedData)

      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderProductDetailsView = () => {
    const {bookData} = this.state
    console.log(bookData)
    const {title, author, description, image, publishedDate, cost} = bookData
    return (
      <div className="product-details-success-view">
        <div className="product-details-container">
          <img src={image} alt="product" className="product-image" />
          <div className="product">
            <h1 className="product-name">{title}</h1>
            <p>{author}</p>
            <p>{publishedDate}</p>
            <p className="price-details">Rs {cost}/-</p>
            <p className="product-description">{description}</p>
            <hr className="horizontal-line" />
            <button type="button" className="button add-to-cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}

export default BookDetails
