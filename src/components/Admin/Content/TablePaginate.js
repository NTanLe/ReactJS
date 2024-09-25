import ReactPaginate from "https://cdn.skypack.dev/react-paginate";
import { useState, useEffect } from "react";


const TablePaginate = (props) => {
  const { listUser, pageCount } = props;
  const handlePageClick = (event) => {
    console.log(`User requested page number ${event.selected}`);
    props.fetchListUserWithPaginate(+event.selected + 1)
    props.setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="btn-action">
                    <button className="btn btn-primary"
                      onClick={() => props.handleClickView(item)}>View</button>
                    <button className="btn btn-warning mx-3"
                      onClick={() => props.handleClickUpdate(item)}
                    >Edit</button>
                    <button className="btn btn-danger"
                      onClick={() => props.handleClickDelete(item)}
                    >Delete</button>
                  </td>
                </tr>
              )
            })}
          {listUser && listUser.length === 0 && <tr><td>Not found data</td></tr>}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  )
}
export default TablePaginate