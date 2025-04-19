import React, { useState } from "react";
import Modal from "../../../utils/Modal";
import Action from "../../../utils/Action";
import CardContainer from "../../../layout/components/card/CardContainer";
import HeaderTable from "../../../layout/components/table/HeaderTable";
import TableContainer from "../../../layout/components/table/TableContainer";

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
      />

      {show && (
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
      )}
    </section>
  );
};

export default Table;
