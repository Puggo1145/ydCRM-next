import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Card,
} from "@/components/ui/card";

const DatabasePage: React.FC = () => {
  return (
    <Card className="h-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className="min-w-10" defaultSize={25}>One</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-w-10" defaultSize={25}>Two</ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="min-w-10" defaultSize={25}>Two</ResizablePanel>
        </ResizablePanelGroup>
    </Card>
  );
};

export default DatabasePage;