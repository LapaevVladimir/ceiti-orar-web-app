"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { getGroups, Group } from "@/api-ceiti-get/api-ceiti-get";
import { useEffect, useState } from "react";

export function GroupSelect() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [groupsList, setGroupList] = useState<Group[]>([]);

    const fetchData = async () => {
        try {
            const groups = await getGroups();
            setGroupList(groups);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchData();
        }
    }, [open]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? groupsList?.find((group: Group) => group.name === value)?.name
                        : "Select Group"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Select Group" />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {groupsList?.map((group: Group) => (
                            <CommandItem
                                key={group.id}
                                value={group.name}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === group.name ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {group.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
