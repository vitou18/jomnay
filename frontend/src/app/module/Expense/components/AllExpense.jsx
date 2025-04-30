import React, { useEffect, useState } from "react";
import useExpense from "../core/action";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import View from "./View";
import Modal from "../../../utils/Modal";
import { ContainerLoader } from "../../../components/other/Loader";

const AllExpense = () => {
  const { fetchExpense, expense, onDeleteExpense, fetchExpenseById, loadData } =
    useExpense();
  const [showAdd, setShowAdd] = useState();
  const [showEdit, setShowEdit] = useState();
  const [showView, setShowView] = useState();

  const onEditExpense = (payload) => {
    setShowEdit((pre) => !pre);
    fetchExpenseById(payload);
  };

  const onViewExpense = (payload) => {
    setShowView((pre) => !pre);
    fetchExpenseById(payload);
    // console.log(payload);
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <>
      <Table
        loadData={loadData}
        onAdd={() => setShowAdd((pre) => !pre)}
        data={expense}
        onEdit={onEditExpense}
        onDelete={onDeleteExpense}
        onView={onViewExpense}
      />

      <Modal
        title="Add Expense"
        desc="Record a new expense entry."
        show={showAdd}
        setShow={setShowAdd}
      >
        <Add onClick={() => setShowAdd((pre) => !pre)} />
      </Modal>

      <Modal title="View Expense" show={showView} setShow={setShowView}>
        <View />
      </Modal>

      <Modal
        title="Edit Expense"
        desc="Update your expense details."
        show={showEdit}
        setShow={setShowEdit}
      >
        <Edit onClick={() => setShowEdit((pre) => !pre)} />
      </Modal>
    </>
  );
};

export default AllExpense;
