import React from "react";
import LatestLeads from "@/components/widgetsTables/LatestLeads";
import Schedule from "@/components/widgetsList/Schedule";
import PaymentRecordChart from "@/components/widgetsCharts/PaymentRecordChart";
import SiteOverviewStatistics from "@/components/widgetsStatistics/SiteOverviewStatistics";
import TasksOverviewChart from "@/components/widgetsCharts/TasksOverviewChart";
import PageHeader from "@/components/shared/pageHeader/PageHeader";
import Footer from "@/components/shared/Footer";
import { crmStatisticsData } from "@/utils/fackData/crmStatisticsData";

const Home = () => {
  return (
    <>
      <PageHeader></PageHeader>
      <div className="main-content">
        <div className="row">
          <SiteOverviewStatistics data={crmStatisticsData} />
          <PaymentRecordChart />
          <TasksOverviewChart />
          <LatestLeads title={"Latest Leads"} />
          <Schedule title={"Upcoming Schedule"} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
