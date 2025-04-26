import React, { useState } from "react";
import HeaderTable from "../../../components/table/HeaderTable";
import CardContainer from "../../../components/card/CardContainer";
import TableContainer from "../../../components/table/TableContainer";
import Modal from "../../../utils/Modal";
import Action from "../../../utils/Action";

const Table = ({ data, onDelete, onAdd, onEdit, onView }) => {
  const [selected, setSelected] = useState({ id: null });
  const [show, setShow] = useState(false);

  const onGetIdCard = (id) => {
    setSelected({ id });
    setShow(true);
  };

  const onDeleteIncome = () => {
    onDelete(selected.id);
    setShow(false);
  };

  return (
    <section className="bg-white rounded-xl p-5 flex flex-col gap-y-7">
      <HeaderTable onClick={onAdd} />

      <CardContainer
        data={data}
        onDelete={onGetIdCard}
        type="expense"
        onEdit={onEdit}
        onView={onView}
      />

      <TableContainer
        onView={onView}
        onDelete={onGetIdCard}
        onEdit={onEdit}
        data={data}
        type="expense"
      />

      <Modal
        title="Delete Expense"
        desc="Are you sure you want to delete this expense?"
        show={show}
        setShow={setShow}
      >
        <Action
          onCancel={() => setShow((pre) => !pre)}
          onSubmit={onDeleteIncome}
        />
      </Modal>
    </section>
  );
};

export default Table;
