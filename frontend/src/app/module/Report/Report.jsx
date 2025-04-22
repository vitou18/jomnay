import React, { useEffect } from "react";
import Container from "../../layout/components/container/Container";
import useReport from "./core/action";
import AllReport from "./components/AllReport";

const Report = () => {
  const { report, fetchReport, onDownloadReport, type, onChangeType } =
    useReport();

  useEffect(() => {
    fetchReport();
  }, [type]);

  // console.log(report);

  return (
    <Container title="Report">
      <AllReport
        data={report}
        type={type}
        onChangeType={onChangeType}
        onDownloadReport={onDownloadReport}
      />
    </Container>
  );
};

export default Report;
