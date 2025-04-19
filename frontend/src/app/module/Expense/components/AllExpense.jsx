import React, { useEffect, useState } from "react";
import useExpense from "../core/action";
import Table from "./Table";
import Modal from "../../../utils/Modal";
import Add from "./Add";
import Edit from "./Edit";
import View from "./View";

const AllExpense = () => {
  const { fetchExpense, expense, onDeleteExpense, fetchExpenseById } =
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
        onAdd={() => setShowAdd((pre) => !pre)}
        data={expense}
        onEdit={onEditExpense}
        onDelete={onDeleteExpense}
        onView={onViewExpense}
      />

      {showAdd && (
        <Modal
          title="Add Expense"
          desc="Record a new expense entry."
          show={showAdd}
          setShow={setShowAdd}
        >
          <Add onClick={() => setShowAdd((pre) => !pre)} />
        </Modal>
      )}

      {showView && (
        <Modal title="View Expense" show={showView} setShow={setShowView}>
          <View />
        </Modal>
      )}

      {showEdit && (
        <Modal
          title="Edit Expense"
          desc="Update your expense details."
          show={showEdit}
          setShow={setShowEdit}
        >
          <Edit onClick={() => setShowEdit((pre) => !pre)} />
        </Modal>
      )}
    </>
  );
};

export default AllExpense;
