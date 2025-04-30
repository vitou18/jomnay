import React, { useEffect } from "react";
import useReport from "./core/action";
import AllReport from "./components/AllReport";
import Container from "../../components/layout/Container";

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

  return (
    <Container title="Report">
      <AllReport
        loadData={loadData}
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
