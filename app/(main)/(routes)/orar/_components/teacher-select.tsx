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
import {getGroups, getTeachers, Group, Teacher} from "@/api-ceiti-get/api-ceiti-get";
import {useContext, useEffect, useState} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Skeleton} from "@/components/ui/skeleton";
import {ScheduleContext} from "@/app/(main)/(routes)/orar/_components/_providers/schedule-provider";

export function TeacherSelect() {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [id, setId] = useState("");

    const [teachersList, setTeachersList] = useState<Teacher[]>([]);

    const setCurrentId = useContext(ScheduleContext)?.setCurrentId;

    const setDefaultId = () => {
        setId(teachersList?.[0]?.id);
    }

    const setDefaultValue = () => {
        setValue(teachersList?.[0]?.name.toLowerCase());
    }

    const fetchData = async () => {
        try {
            const groups = await getTeachers();
            setTeachersList(groups);
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
        if (setCurrentId) {
            setCurrentId(id);
        }
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
                                ?  teachersList?.find((teacher: Teacher) => teacher.name.toLowerCase() === value)?.name
                                : "Select Teacher"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 h-72">
                        <Command>
                            <CommandInput placeholder="Select Teacher" />
                            <CommandEmpty>No teacher found.</CommandEmpty>
                            <ScrollArea className="h-72 w-full">
                                <CommandGroup className="px-2">
                                    {teachersList?.map((teacher: Teacher) => (
                                        <CommandItem
                                            key={teacher.id}
                                            value={teacher.name}
                                            onSelect={(currentValue) => {
                                                setValue((currentValue === value ? "" : currentValue).toLowerCase());
                                                setOpen(false);
                                                if (setCurrentId) {
                                                    setCurrentId(teacher.id);
                                                }
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === teacher.name.toLowerCase() ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {teacher.name}
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
