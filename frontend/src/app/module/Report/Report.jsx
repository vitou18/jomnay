import React, { useEffect } from "react";
import useReport from "./core/action";
import AllReport from "./components/AllReport";
import Container from "../../components/layout/Container";
import { ReportLoader } from "../../components/other/Loader";

const Report = () => {
  const {
    report,
    fetchReport,
    format,
    onChangeFormat,
    onDownloadReport,
    type,
    onChangeType,
    loading,
  } = useReport();

  useEffect(() => {
    fetchReport();
  }, [type]);

  // console.log(report);

  // Handle loading state
  if (loading) {
    return (
      <Container title="Report">
        <ReportLoader />
      </Container>
    );
  }

  // Render actual content when data is available
  return (
    <Container title="Report">
      {report && report.length > 0 ? (
        <AllReport
          data={report}
          type={type}
          format={format}
          onChangeFormat={onChangeFormat}
          onChangeType={onChangeType}
          onDownloadReport={onDownloadReport}
        />
      ) : (
        <div className="h-30 text-gray-500 w-full flex items-center text-center justify-center">
          No data available
        </div>
      )}
    </Container>
  );
};

export default Report;
