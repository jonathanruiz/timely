"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import z from "zod"

const schema = z.object({
    time: z.string().nonempty({ message: "Time is required" }),
    timezone: z.string().nonempty({ message: "Timezone is required" }),
})

export default function Home() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    })

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <main className="p-24">
            <h1 className="text-5xl">Timely</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Time</Label>
                    <Input type="datetime-local" {...register("time")} />
                    {errors.time && (
                        <p className="text-red-500">
                            <>{errors.time.message}</>
                        </p>
                    )}
                </div>
                <div>
                    <Label>Timezone</Label>
                    <Input type="text" {...register("timezone")} />
                    {errors.timezone && (
                        <p className="text-red-500">
                            <>{errors.timezone.message}</>
                        </p>
                    )}
                </div>
                <Button type="submit" className="p-5 my-5 bg-blue-500">
                    Submit
                </Button>
            </form>
        </main>
    )
}
