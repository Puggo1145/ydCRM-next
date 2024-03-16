import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

import {
    Plus,
    School, Users, GraduationCap
} from 'lucide-react';

import AddObjectSheet from "./add-object-sheet";

export type Objects = 'school' | 'teacher' | 'student';
type ObjectAlias = '学校' | '老师' | '学生';
interface addObjects {
    object: Objects;
    alias: ObjectAlias;
    icon: React.ReactNode;
}
export const addObjects: addObjects[] = [
    {
        object: 'school',
        alias: '学校',
        icon: <School size={32} />
    },
    {
        object: 'teacher',
        alias: '老师',
        icon: <Users size={32} />
    },
    {
        object: 'student',
        alias: '学生',
        icon: <GraduationCap size={32} />
    }
];

import { useState } from "react";

const ChooseAddObject: React.FC = () => {
    const [targetObject, setTargetObject] = useState<Objects>();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    function triggerSheet(object: Objects) {
        setTargetObject(object);
        setIsSheetOpen(!isSheetOpen);
    }

    return (
        <>
            <Dialog>
                <Button asChild>
                    <DialogTrigger>
                        <Plus className="mr-2" size={20} />
                        添加
                    </DialogTrigger>
                </Button>
                <DialogContent className="rounded-xl w-[90%] max-w-[500px]">
                    <DialogHeader className="items-baseline md:items-center">
                        <DialogTitle>添加对象</DialogTitle>
                        <DialogDescription>请从下方选择要添加的对象</DialogDescription>
                    </DialogHeader>
                    <div className="
                        flex items-center justify-between gap-x-4"
                    >
                        {
                            addObjects.map((item, index) => (
                                <Button
                                    asChild
                                    key={index}
                                    variant="outline"
                                    className="
                                        w-full md:w-auto 
                                        flex-1 h-24 md:h-36 
                                        flex flex-col
                                        gap-y-2"
                                    onClick={() => triggerSheet(item.object)}
                                >
                                    <DialogClose>
                                        {item.icon}
                                        <span className="text-sm font-normal">{item.alias}</span>
                                    </DialogClose>
                                </Button>
                            ))
                        }
                    </div>
                </DialogContent>
            </Dialog>
            <AddObjectSheet
                object={targetObject}
                isSheetOpen={isSheetOpen}
                setIsSheetOpen={setIsSheetOpen}
            />
        </>
    );
};

export default ChooseAddObject;