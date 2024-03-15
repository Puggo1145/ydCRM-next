import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const loaderVariants = cva(
    "text-muted-foreground animate-spin",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                sm: "h-2 w-2",
                lg: "h-6 w-6",
                icon: "h-10 w-10"
            }
        },
        defaultVariants: {
            size: "default"
        }
    }
)

interface LoaderProps extends VariantProps<typeof loaderVariants> {
    className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size, className }) => {
    return (
        <LoaderCircle className={cn(loaderVariants({ size }), className)} />
    );
};

export default Loader;