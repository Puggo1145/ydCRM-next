import { ModeToggle } from '@/components/ui/mode-toggle';

const LoginHeader: React.FC = () => {

    return (
        <header className="w-full h-16 p-3 flex items-center justify-between">
            <ModeToggle />
        </header>
    );
};

export default LoginHeader;