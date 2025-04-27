import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reqDownloadReport, reqGetReport } from "./request";
import { setFormat, setReport, setType } from "./slice";
import toast from "react-hot-toast";

const useReport = () => {
  const report = useSelector((state) => state.report);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { type, format } = report;

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
      const response = await reqDownloadReport(type, format);

      let mimeType = "application/octet-stream";
      let defaultFileName = "report";

      switch (format) {
        case "excel":
          mimeType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          defaultFileName += ".xlsx";
          break;
        case "csv":
          mimeType = "text/csv";
          defaultFileName += ".csv";
          break;
        case "pdf":
          mimeType = "application/pdf";
          defaultFileName += ".pdf";
          break;
        default:
          toast.error("Unsupported file format");
          return;
      }

      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        link.download = match?.[1] || defaultFileName;
      } else {
        link.download = defaultFileName;
      }

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

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
