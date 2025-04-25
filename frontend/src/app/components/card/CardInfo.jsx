import { RiDeleteBin7Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import moment from "moment/moment";
import Tooltip from "./Tooltip";
import { MdOutlineAttachMoney } from "react-icons/md";
import Button from "../../utils/Button";

const CardInfo = ({ data, onDelete, onEdit, type, onView }) => {
  const formattedDate = (date) => moment(date).format("Do MMM YYYY");

  const onClickDelete = (id, category) => {
    // console.log(id, category);

    onDelete(id, category);
  };

  return (
    <article className="flex items-start py-1 justify-between rounded-md">
      <div className="flex flex-col gap-2.5">
        <div
          className={`w-[40px] h-[40px] text-lg rounded-md grid place-items-center
            ${
              type === "income"
                ? "text-green-600 bg-green-600/5"
                : "text-red-600 bg-red-600/5"
            }
            `}
        >
          <MdOutlineAttachMoney />
        </div>

        <div className="flex flex-col">
          <span>{data?.category}</span>
          <span className="text-sm">{formattedDate(data?.date)}</span>
        </div>
      </div>

      <div className="flex justify-between items-end h-full flex-col">
        <Tooltip type={type} amount={data?.amount} />

        <div className="flex items-center justify-end">
          <Button icon={RiEyeLine} type="edit" onClick={() => onView(data)} />
          <Button icon={RiEditLine} type="edit" onClick={() => onEdit(data)} />
          <Button
            onClick={() => onClickDelete(data?._id)}
            icon={RiDeleteBin7Line}
            type="delete"
          />
        </div>
      </div>
    </article>
  );
};

export default CardInfo;
