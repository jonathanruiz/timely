"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const schema = z.object({
    time: z.string().nonempty({ message: "Time is required" }),
    timezone: z.string().nonempty({ message: "Timezone is required" }),
})

// Get all TZ identifiers
const tzIdentifiers = Intl.supportedValuesOf("timeZone")

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
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    autoComplete="off"
                    className="m-auto md:w-1/2 sm:w-2/3"
                >
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="datetime-local" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Timezone</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-[300px]">
                                            <SelectValue placeholder="Select a Timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup className="max-h-[300px] overflow-y-auto">
                                                {tzIdentifiers.map((tz) => (
                                                    <SelectItem
                                                        key={tz}
                                                        value={tz}
                                                    >
                                                        <SelectLabel>
                                                            {tz}
                                                        </SelectLabel>
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormDescription>
                                    This is the timezone you want to display
                                    your time in.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="p-5 my-5 bg-blue-500">
                        Submit
                    </Button>
                </form>
            </Form>
        </main>
    )
}
