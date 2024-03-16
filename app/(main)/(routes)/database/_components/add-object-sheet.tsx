import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { addObjects } from "./choose-add-object";
// types
import type { Objects } from "./choose-add-object";

interface AddObjectSheetProps {
  object: Objects | undefined;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
}

const AddObjectSheet: React.FC<AddObjectSheetProps> = ({ object, isSheetOpen, setIsSheetOpen }) => {
  const objectAlias = addObjects.find((o) => o.object === object)?.alias;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            添加{objectAlias}
          </SheetTitle>
          <SheetDescription>请填写{objectAlias}的基本信息</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddObjectSheet;