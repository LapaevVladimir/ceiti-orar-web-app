"use client";
import {Button} from "@/components/ui/button";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";

export const ReturnOrar = () => {

    return (
        <div className="pr-8 max-sm:pr-4">
            <Button
                asChild
                className="relative flex flex-col p-0 px-2 w-10 "
                variant="outline"
            >
                <Link href="/orar">
                    <ChevronLeft/>
                </Link>
            </Button>
        </div>
    );
};