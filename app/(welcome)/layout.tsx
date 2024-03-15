// 该组件用于处理用户认证与重定向
import { PropsWithChildren } from "react";

const WelcomeLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="h-full">
            <main className="h-full">
                {children}
            </main>
        </div>
    );
};

export default WelcomeLayout;