import React from 'react'
import { Team } from '@prisma/client';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

type Props = {
    team: Team;
}

function ViewTeamMembers({ team }: Props) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{team.name}'s Members</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
          <DialogClose asChild>
            <Button 
                type="button"
                variant="secondary"
            >
                Close
            </Button>
          </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}

export default ViewTeamMembers;