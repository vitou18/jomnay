import { useEffect, useState } from "react";
import useIncome from "../core/action";
import Table from "./Table";
import Modal from "../../../utils/Modal";
import Add from "./Add";
import Edit from "./Edit";
import View from "./View";

const AllIncome = () => {
  const { fetchIncome, income, onDeleteIncome, fetchIncomeById } = useIncome();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);

  const onEditIncome = (payload) => {
    setShowEdit((pre) => !pre);
    fetchIncomeById(payload);
  };

  const onViewIncome = (payload) => {
    setShowView((pre) => !pre);
    fetchIncomeById(payload);
    // console.log(payload);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <>
      <Table
        data={income}
        onAdd={() => setShowAdd((pre) => !pre)}
        onDelete={onDeleteIncome}
        onEdit={onEditIncome}
        onView={onViewIncome}
      />

      {showAdd && (
        <Modal
          title="Add Income"
          desc="Record a new income entry."
          show={showAdd}
          setShow={setShowAdd}
        >
          <Add onClick={() => setShowAdd((pre) => !pre)} />
        </Modal>
      )}

      {showView && (
        <Modal title="View Income" show={showView} setShow={setShowView}>
          <View />
        </Modal>
      )}

      {showEdit && (
        <Modal
          title="Edit Income"
          desc="Update your income details."
          show={showEdit}
          setShow={setShowEdit}
        >
          <Edit onClick={() => setShowEdit((pre) => !pre)} />
        </Modal>
      )}
    </>
  );
};

export default AllIncome;
