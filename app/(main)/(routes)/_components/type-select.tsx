"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useContext, useEffect} from "react";
import {ScheduleContext} from "@/app/(main)/(routes)/_components/_providers/schedule-provider";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useTelegram} from "@/app/(main)/(routes)/_components/_providers/telegram-provider";

const selectType = [
    {
        value: "teacher",
        label: "Teacher",
    },
    {
        value: "class",
        label: "Group",
    }
]

interface TypeProps{
    setType: (type: string) => void
}

export function TypeSelect({
   setType
}: TypeProps) {
    const { user, webApp } = useTelegram();
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("class")

    const setCurrentType = useContext(ScheduleContext)?.setCurrentType;

    const promise = useQuery(api.settings.getUserSettings, {userId: user?.id.toString() || ""});

    useEffect(() => {
       /* if (setCurrentType) {
            if(promise){
                setValue(promise.type)
            }
            setCurrentType(value);
        }*/
    }, []);

    useEffect(() => {
        if (setCurrentType) {
            if(promise){
                setValue(promise.type)
            }
            setCurrentType(value);
            setType(promise && promise.type || value)
        }
    }, [promise]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            {value}
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectType?.find((selected) => selected.value === value)?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandGroup>
                        {selectType.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue)
                                    setOpen(false)
                                    setType(currentValue)
                                    if (setCurrentType) {
                                        setCurrentType(currentValue === "teacher" ? "teacher" : "class")
                                    }
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
