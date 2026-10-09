export default function Divider({ className = "" }: { className?: string }) {
    return <hr className={`h-px border-0 bg-line ${className}`} />;
}
