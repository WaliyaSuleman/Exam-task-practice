"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RiDeleteBin6Line } from "react-icons/ri";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { createLorem } from "@/actions/createLorem";
import { useRouter } from "next/navigation";
import { loremSchema } from "@/schemas/loremSchema";
import { useCallback, useEffect, useState } from "react";
import { getLorems } from "@/actions/getLorems";
import { deleteLorem } from "@/actions/deleteLorem";

const Home = () => {

  // 1. Define your form.
  const form = useForm<z.infer<typeof loremSchema>>({
    resolver: zodResolver(loremSchema),
    defaultValues: {
      name: "",
    },
  })

  const[lorems,setLorem]=useState<any>();


  useEffect(() => {
    getLorems().then((data)=>{
      setLorem(data)
    }).catch((err)=>{console.log(err);}
    )

  }, [lorems])


  const router = useRouter();

  function onSubmit(values: z.infer<typeof loremSchema>) {
    createLorem(values).then(() => {
      router.refresh();
    })
  }

  const handleDelete=useCallback((loremId:String)=>{
    deleteLorem(loremId).then(()=>{
      router.refresh();
    })
  },[])
    return (
      <div className='flex flex-col items-center w-full min-h-screen bg-yellow-200'> {/* Center the content */}

        <div className='w-[700px] mt-9 gap-x-10 grid grid-cols-3 mb-9'> {/* mb-9 to add space below the grid */}
          <div className='rounded-md h-[100px] border border-black flex items-center justify-center bg-red-200'>
            <div className='flex flex-col items-center'>
              <h1>Lorem ipsum</h1>
              <h1 className='text-4xl font-bold'>03</h1>
            </div>
          </div>
          <div className='rounded-md h-[100px] border border-black flex items-center justify-center bg-green-200'>
            <div className='flex flex-col items-center'>
              <h1>Lorem ipsum</h1>
              <h1 className='text-4xl font-bold'>11</h1>
            </div>
          </div>
          <div className='rounded-md h-[100px] border border-black flex items-center justify-center bg-blue-200'>
            <div className='flex flex-col items-center'>
              <h1>Lorem ipsum</h1>
              <h1 className='text-4xl font-bold'>52</h1>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-2 items-start justify-center "> {/* flex-col to stack items vertically */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full "> {/* w-full and max-w-xs to control input width */}
                  <FormControl>
                    <Input placeholder="Enter something here" {...field} className="w-[530px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <Button type="submit" className="w-32  ">Create</Button> {/* w-full and max-w-xs to control button width */}
          </form>
        </Form>

        {lorems?.map((lorems:any) => {
          return (
            <Card key={lorems.id} className="rounded-lg bg-yellow-200  flex flex-col w-[700px]  border border-black mt-10 justify-center">

              <CardContent className="bg-white rounded-lg ">
                <p className=" pt-8">{lorems?.name}</p>
              </CardContent>
              <CardFooter className=" bg-white rounded-lg flex justify-between">
                <Button variant={"destructive"}>Click Me</Button>
                <RiDeleteBin6Line size={25} onClick={()=>{handleDelete(lorems.id)}} cursor={"pointer"}/>
              </CardFooter>
            </Card>
          );
        })}

      </div>
    );
  }

  export default Home;
