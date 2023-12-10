import React from 'react';
import {Button} from "@/components/ui/button";
import {Info as InfoIcon} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link";

export const Info = () => {
    return (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        className="absolute top-4 right-4 px-2"
                        variant="outline"
                    >
                        <InfoIcon/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>About</AlertDialogTitle>
                        <AlertDialogDescription>
                            The schedule was created just for fun; at the current stage there may be bugs, errors, etc.
                            If you notice any of these, please <a href="https://t.me/LapaevVladimir">write to me</a>. I&apos;ll try to fix them.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <Link href="https://t.me/LapaevVladimir">Write me</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    );
};
