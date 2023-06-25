import './index.css'

const BookItem = props => {
  const {productData} = props
  const {title, averageRating, image, publishedDate} = productData

  return (
    <li className="product-item">
      <img src={image} alt="book" className="thumbnail" />
      <div className="details">
        <h1 className="title">{title}</h1>
        <p className="date">Published Date:{publishedDate}</p>
        <p className="brand">Rating: {averageRating}</p>
      </div>
    </li>
  )
}
export default BookItem
