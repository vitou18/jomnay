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
      // Make the API call to download the report
      const response = await reqDownloadReport({ type, format, from, to });

      let mimeType = "application/octet-stream";
      let defaultFileName = "report";

      // Handle different file formats
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

      // Create the Blob from the response data
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.href = url;

      // Extract filename from content-disposition header if present
      const contentDisposition = response.headers["content-disposition"];
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        link.download = match?.[1] || defaultFileName;
      } else {
        link.download = defaultFileName;
      }

      // Trigger the download and clean up
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url); // Free up memory

      // Show success toast
      toast.success("Report downloaded successfully!");
    } catch (error) {
      // Handle error case
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
