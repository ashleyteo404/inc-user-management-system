import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Team } from '@prisma/client';
import { PencilIcon, Trash2Icon } from 'lucide-react';

type Props = {
    teams: Team[];
}

function TeamRow({ teams }: Props) {
  return (
    <div className="space-y-8">
      {teams.map((team) => {
        return (
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{team.name.split(' ').map(word => word[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{team.name}</p>
            </div>
            <div className="flex ml-auto space-x-3" >
              <PencilIcon />
              <Trash2Icon />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TeamRow;