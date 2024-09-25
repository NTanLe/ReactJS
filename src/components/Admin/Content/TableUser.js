
const TableUser = (props) => {
  const { listUser } = props;


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
    </>
  )
}
export default TableUser