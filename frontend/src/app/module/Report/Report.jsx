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
    loadData,
  } = useReport();

  useEffect(() => {
    fetchReport();
  }, [type]);

  // console.log(report);

  if (loadData) {
    return (
      <Container title="Report">
        <ReportLoader />
      </Container>
    );
  }

  return (
    <Container title="Report">
      <AllReport
        data={report}
        type={type}
        format={format}
        onChangeFormat={onChangeFormat}
        onChangeType={onChangeType}
        onDownloadReport={onDownloadReport}
      />
    </Container>
  );
};

export default Report;
