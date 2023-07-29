"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { IANA_TIMEZONES_GROUPS as groups, IANA_TIMEZONES as timezones } from "@/lib/tz"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandShortcut,
} from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const schema = z.object({
    time: z.string().nonempty({ message: "Time is required" }),
    timezone: z.string().nonempty({ message: "Timezone is required" }),
})

const localTimezone = {
    group: "Local",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    label: "Local timezone",
}

// Get Coordinated Universal Timezone
const utc = {
    group: "UTC",
    timezone: "Coordinated Universal Time",
    label: "Coordinated Universal Time (UTC)",
}

export default function Home() {
    const form = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <main className="p-24">
            <h1 className="text-5xl text-center">Timely</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off" className="m-auto md:w-1/2 sm:w-2/3">
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="datetime-local"
                                        className="w-[300px] max-h-[300px] overflow-y-auto"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Timezone</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[300px] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? timezones.find((tz) => tz.timezone === field.value)?.timezone
                                                    : "Select timezone"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] max-h-[300px] overflow-y-auto p-0">
                                        <Command>
                                            <CommandInput placeholder="Type to search (country, city)" />
                                            <CommandEmpty>No timezone found.</CommandEmpty>
                                            <CommandGroup key="default" heading="Default">
                                                <CommandItem
                                                    value={localTimezone.timezone}
                                                    key="default"
                                                    onSelect={() => {
                                                        form.setValue("timezone", localTimezone.timezone)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            localTimezone.timezone === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    <span>{localTimezone.timezone}</span>
                                                    <CommandShortcut>{localTimezone.group}</CommandShortcut>
                                                </CommandItem>
                                                <CommandItem
                                                    value={utc.timezone}
                                                    key="default"
                                                    onSelect={() => {
                                                        form.setValue("timezone", utc.timezone)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            utc.timezone === field.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    <span>{utc.timezone}</span>
                                                    <CommandShortcut>{utc.group}</CommandShortcut>
                                                </CommandItem>
                                            </CommandGroup>
                                            {groups.map((group) => (
                                                <CommandGroup key={group} heading={group}>
                                                    {timezones.map((tz) =>
                                                        tz.timezone.split("/")[0] === group ? (
                                                            <CommandItem
                                                                value={tz.timezone}
                                                                key={tz.timezone}
                                                                onSelect={() => {
                                                                    form.setValue("timezone", tz.timezone)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        tz.timezone === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                <span>{tz.timezone}</span>
                                                                <CommandShortcut>{tz.group}</CommandShortcut>
                                                            </CommandItem>
                                                        ) : null
                                                    )}
                                                </CommandGroup>
                                            ))}
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>This is the timezone you want to display.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="p-5 my-5 bg-blue-500">
                        Submit
                    </Button>
                    <div>{JSON.stringify(form.watch(), null, 2)}</div>
                </form>
            </Form>
        </main>
    )
}
