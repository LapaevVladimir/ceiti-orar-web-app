
import React from 'react';
import {ModeToggle} from "@/components/mode-toggle";
import {GroupSelect} from "@/app/(main)/(routes)/orar/_components/group-select";

const Navbar = () => {
    return (
        <div className="w-full flex flex-row justify-between">
            <GroupSelect/>
            <ModeToggle />
        </div>
    );
};

export default Navbar;