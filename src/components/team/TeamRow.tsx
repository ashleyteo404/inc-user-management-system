import React from 'react'
import { Team } from '@prisma/client';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import TeamRowDetails from './TeamRowDetails';
import EditTeamModal from './EditTeamModal';
import DeleteTeamModal from './DeleteTeamModal';
import Link from 'next/link';
import { Button } from '../ui/button';

type Props = {
    teams: Team[];
}

function TeamRow({ teams }: Props) {
  return (
    <div className="space-y-8">
      {teams.map((team) => {
        return (
          <div key={team.id} className="flex items-center">
            <TeamRowDetails team={team} />
            <div className="flex ml-auto space-x-3" >
              <Link href={`/team/${team.id}`}>
                <Button variant="outline">
                  View Members
                </Button>
              </Link>
              <EditTeamModal team={team} />
              <DeleteTeamModal teamId={team.id} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TeamRow;