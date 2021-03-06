import React from "react";
import { Link } from "gatsby";

class Pagination extends React.Component {
  render() {
    const urlPath = this.props.urlPath
    const numPages = this.props.numPages
    const currentPage = this.props.currentPage

    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? `/${urlPath}` : `/${urlPath}/` + (currentPage - 1).toString()
    const nextPage = `/${urlPath}/` + (currentPage + 1).toString()
    const plusFive = currentPage + 5;
    const minusFive = currentPage - 5;
    const lastMinusOne = numPages - 1;
    const lastMinusOneLink = `/${urlPath}/` + lastMinusOne.toString();

    return (
      <nav className="my-5 container">
          <ul className="pagination flex-wrap justify-content-center">
                {!isFirst && (
                  <li className="page-item">
                    <Link to={prevPage} className="page-link" rel="prev">
                      ← Previous
                    </Link>
                  </li>
                )}
                {currentPage > 4 && (
                  <>
                    <li className="page-item">
                      <Link to={`/${urlPath}/`} className="page-link">
                        1
                      </Link>
                    </li>
                    <li>...</li>
                  </>
                )}                
                {Array.from({ length: numPages }, (_, i) => (
                  i > minusFive && i < plusFive && (
                  <li
                    key={`pagination-number${i + 1}`}
                    className={`page-item ${i + 1 === currentPage ? ' active' : ''}`}
                  >
                    <Link
                      to={`/${urlPath}/${i === 0 ? '' : i + 1}`}
                      className="page-link"
                    >
                      {i + 1}
                    </Link>
                  </li>
                  )
                ))}
                {currentPage < (lastMinusOne - 5) && (
                  <>
                    <li>...</li>
                    <li className="page-item">
                      <Link to={lastMinusOneLink} className="page-link">
                        {lastMinusOne}
                      </Link>
                    </li>
                  </>
                )}
                {!isLast && (
                  <li className="page-item">
                    <Link to={nextPage} className="page-link" rel="next">
                      Next →
                    </Link>
                  </li>
                )}
              </ul>
      </nav>
    )
  }
};

export default Pagination