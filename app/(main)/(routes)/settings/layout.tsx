
const SettingsMainLayout = ({
    children
} : {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-screen w-screen">
            <main className="h-screen w-screen">
                {children}
            </main>
        </div>
    );
}

export default SettingsMainLayout;