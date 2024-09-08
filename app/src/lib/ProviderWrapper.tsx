import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CampaignProvider } from "../context/CampaignContext";

export default function ProviderWrapper({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <CampaignProvider>
            <DndProvider backend={HTML5Backend}>
              {children}
            </DndProvider>
          </CampaignProvider>
    );
  }