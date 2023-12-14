import React from 'react'
import { Member } from '@prisma/client';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import MemberRowDetails from './MemberRowDetails';
// import EditTeamModal from './EditTeamModal';
// import DeleteTeamModal from './DeleteTeamModal';

type Props = {
    members: Member[];
}

function MemberRow({ members }: Props) {
  return (
    <div className="space-y-8">
      {members.map((member) => {
        return (
          <div key={member.id} className="flex items-center">
            <MemberRowDetails member={member} />
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

export default MemberRow;