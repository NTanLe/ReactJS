import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useState, useEffect } from "react";
import { getAllUsers, getUserWithPaginate } from '../../../services/apiService';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TablePaginate from "./TablePaginate";
const ManageUser = (props) => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const LIMIT_USER = 7;
  const [pageCount, setPageCount] = useState(0);

  const handleClickUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  }
  const handleClickView = (user) => {
    setShowModalView(true);
    setDataView(user);
  }
  const handleClickDelete = (user) => {
    setShowModalDelete(true);
    setDataDelete(user);
  }
  const resetUpdateData = () => {
    setDataUpdate({});
  }

  useEffect(() => {
    fetchListUserWithPaginate(1)
    // fetchListUser();
  }, [])


  const fetchListUser = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUser(res.DT);
    }
  }

  const fetchListUserWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  }


  return (
    <div className="manage-user-container">
      <div className="title">
        Manage Users
      </div>
      <div className="user-content">
        <div className="btn-add-new">
          <button className="btn btn-primary add" onClick={() => setShowModalCreate(true)}><FcPlus /> Add new User</button>
        </div>
        <div className="table-user-container">
          <TablePaginate listUser={listUser} handleClickUpdate={handleClickUpdate} handleClickView={handleClickView} handleClickDelete={handleClickDelete} fetchListUserWithPaginate={fetchListUserWithPaginate} pageCount={pageCount} currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser show={showModalCreate} setShow={setShowModalCreate} fetchListUser={fetchListUser} currentPage={currentPage}
          setCurrentPage={setCurrentPage} fetchListUserWithPaginate={fetchListUserWithPaginate} />
        <ModalUpdateUser show={showModalUpdate} setShow={setShowModalUpdate} dataUpdate={dataUpdate} fetchListUser={fetchListUser} resetUpdateData={resetUpdateData} currentPage={currentPage} setCurrentPage={setCurrentPage} fetchListUserWithPaginate={fetchListUserWithPaginate} />
        <ModalViewUser show={showModalView} setShow={setShowModalView} dataView={dataView} />
        <ModalDeleteUser show={showModalDelete} setShow={setShowModalDelete} fetchListUser={fetchListUser} dataDelete={dataDelete} currentPage={currentPage} setCurrentPage={setCurrentPage} fetchListUserWithPaginate={fetchListUserWithPaginate} />
      </div>

    </div>
  )
}
export default ManageUser;