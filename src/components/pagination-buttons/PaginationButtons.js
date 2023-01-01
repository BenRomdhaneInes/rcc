
import React, {useEffect, useState} from 'react'
import './style.css'
const PaginationBar = ({ count,limit, offset, setOffset }) => {
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setTotalPages(Math.floor(count / limit))
  }, [count, limit])
  
  return (
    <div className="pagination">
      <button className="material-icons pagination-item" onClick={() => setOffset(offset - limit)}>
        chevron_left
      </button>
      {Array.from({ length: totalPages }).map((_el, index) => (
        <span
          className={`pagination-item ${offset / limit === index ? 'selected' : ''}`}
          key={index}
          onClick={() => setOffset(index * limit)}
        >
          {index + 1}
        </span>
      ))}
      <button
        className="material-icons pagination-item"
        onClick={() => setOffset(offset + limit)}
      >
        chevron_right
      </button>
    </div>
  )
}

export default PaginationBar
