// 该组件用于处理用户认证与重定向
import { PropsWithChildren } from "react";

import Header from "./_components/header";

const WelcomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
};

export default WelcomeLayout;