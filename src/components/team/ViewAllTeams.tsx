import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Team } from '@prisma/client';
import TeamRow from './TeamRow';
import { PlusIcon } from 'lucide-react';
import CreateTeam from './CreateTeam';

type Props = {
    teams: Team[];
}

function ViewAllTeams({ teams }: Props) {
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle className="flex">
                    <div className="flex" >
                        Teams
                    </div>
                    <div className="ml-auto">
                        <CreateTeam />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <TeamRow teams={teams} />
            </CardContent>
        </Card>
    </>
  )
}

export default ViewAllTeams