import React from "react";
import CommonChart from "./CommonChart";
import { useCampaign } from "../context/CampaignContext";

const DeviceMetricsModal = () => {
  const { modalData = {}, setModalData } = useCampaign();
  if (!modalData) return null;

  const deviceMetricsChartData = modalData
    ? {
        labels: ["Mobile", "Desktop", "Tablet"],
        datasets: [
          {
            label: modalData.metric,
            data: [modalData.deviceMetrics.mobile, modalData.deviceMetrics.desktop, modalData.deviceMetrics.tablet],
            backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {modalData.label} - {modalData.metric}
        </h2>

        <div className="mb-4 h-[500px]">
          {deviceMetricsChartData && (
            <CommonChart data={deviceMetricsChartData} />
          )}
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setModalData(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DeviceMetricsModal;
