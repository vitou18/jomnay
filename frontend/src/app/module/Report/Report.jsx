import React, { useEffect } from "react";
import Container from "../../layout/components/container/Container";
import useReport from "./core/action";
import AllReport from "./components/AllReport";

const Report = () => {
  const { report, fetchReport, onDownloadReport } = useReport();

  useEffect(() => {
    fetchReport();
  }, []);

  // console.log(report);

  return (
    <Container title="Report">
      <AllReport data={report} onDownloadReport={onDownloadReport} />
    </Container>
  );
};

export default Report;
