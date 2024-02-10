import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import type { Member } from '@prisma/client';
import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { format } from 'date-fns';

type Props = {
    member: Member;
}

export default function memberRowDetails({ member }: Props) {
  return (
    <Dialog>
    <DialogTrigger>
        <div className="flex items-center justify-items-start">
            <Avatar className="h-9 w-9">
            <AvatarImage src="" alt="Avatar" />
            <AvatarFallback>{member.name.split(' ').map(word => word[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
                <p className="text-sm text-left font-medium leading-none">{member.name}</p>
                <p className="text-sm text-left text-muted-foreground">{member.email}</p>
                <p className="text-sm text-muted-foreground">
                    Last updated at {format(new Date(member.updatedAt), 'dd-MM-yyyy HH:mm:ss')}
                </p>
            </div>
        </div>
    </DialogTrigger>
    {/* <ViewmemberMembers member={member} /> */}
  </Dialog>
  )
}