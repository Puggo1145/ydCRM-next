import { PropsWithChildren } from "react";
import { Annoyed } from 'lucide-react';

const NoData: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col items-center text-sm text-foreground">
            <Annoyed size={32} className="text-foreground mb-2" />
            {children ?? "暂无数据"}
        </div>
    );
};

export default NoData;