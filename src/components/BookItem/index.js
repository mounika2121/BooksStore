import {Link} from 'react-router-dom'

import './index.css'

const BookItem = props => {
  const {productData} = props
  const {title, author, image, publishedDate, id} = productData

  return (
    <li className="product-item">
      <Link to={`/${id}`} className="link-item">
        <img src={image} alt="book" className="thumbnail" />
        <h1 className="title">{title}</h1>
        <p className="brand">Author: {author}</p>
        <div className="product-details">
          <p className="price">Published Date:{publishedDate}</p>
        </div>
      </Link>
    </li>
  )
}
export default BookItem
