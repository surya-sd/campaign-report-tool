import RootContainer from "./src/components/RootContainer";
import { fetchCampaigns } from "./src/services/apiService";

const Home = async () => {
const campaignsData = await fetchCampaigns();
  return (
    <div className="p-4 bg-gradient-to-b from-slate-300 to-blue-200 h-full">
      <h1 className="text-2xl font-bold mb-4 text-black">Ad Campaign Report</h1>
      <RootContainer data={campaignsData} />
    </div>
  );
};

export default Home;
