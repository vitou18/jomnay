import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqDownloadReport, reqGetReport } from "./request";
import { setFormat, setReport, setType } from "./slice";
import toast from "react-hot-toast";

const useReport = () => {
  const report = useSelector((state) => state.report);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { type } = report;

  const fetchReport = async () => {
    return reqGetReport(type)
      .then((res) => {
        // console.log(res.data.report);
        dispatch(setReport(res.data.report));
      })
      .catch((e) => {
        console.log("Error fetching report...");
      });
  };

  const onChangeType = (e) => dispatch(setType(e.target.value));
  
  const onChangeFormat = (e) => dispatch(setFormat(e.target.value));

  const onDownloadReport = async () => {
    try {
      const response = await reqDownloadReport(type);

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })
      );

      const link = document.createElement("a");
      link.href = url;

      let fileName = "report.xlsx";

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match?.[1]) {
          fileName = match[1];
        }
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Report downloaded successfully!");
    } catch (error) {
      toast.error("Report download failed!");
      console.error("Download error:", error);
    }
  };

  return {
    ...report,
    fetchReport,
    onDownloadReport,
    onChangeType,
    onChangeFormat,
    navigate,
  };
};

export default useReport;
