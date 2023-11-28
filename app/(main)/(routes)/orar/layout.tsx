
const OrarMainLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full w-full">
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    );
}

export default OrarMainLayout;