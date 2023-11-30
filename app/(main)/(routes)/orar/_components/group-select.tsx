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
import {useContext, useEffect, useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Skeleton} from "@/components/ui/skeleton";
import {ScheduleContext} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";

export function GroupSelect() {
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [id, setId] = useState("");

    const [groupsList, setGroupList] = useState<Group[]>([]);

    const context = useContext(ScheduleContext);

    if (!context) {
        return null;
    }

    const {setCurrentId} = context;

    const setDefaultValue = () => {
        setValue(groupsList?.[0]?.name.toUpperCase());
    }

    const setDefaultId = () => {
        setId(groupsList?.[0]?.id);
    }

    const fetchData = async () => {
        try {
            const groups = await getGroups();
            setGroupList(groups);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setDefaultValue();
        setDefaultId();
    }, [loading]);

    useEffect(() => {
        setCurrentId(id);
    }, [id]);

    return (
        loading
            ? <Skeleton className="w-[200px] h-[40px] border-r-2"/>
            : (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value
                                ?  groupsList?.find((group: Group) => group.name === value)?.name
                                : "Select Group"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 h-72">
                        <Command>
                            <CommandInput placeholder="Select Group" />
                            <CommandEmpty>No group found.</CommandEmpty>
                            <ScrollArea className="h-72 w-full">
                                <CommandGroup className="px-2">
                                    {groupsList?.map((group: Group) => (
                                        <CommandItem
                                            key={group.id}
                                            value={group.name}
                                            onSelect={(currentValue) => {
                                                setValue((currentValue === value ? "" : currentValue).toUpperCase());
                                                setOpen(false);
                                                setId(group.id);
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
                            </ScrollArea>
                        </Command>
                    </PopoverContent>
                </Popover>
            )
    );
}
