import React from 'react'
import type { Member } from '@prisma/client';
import MemberRowDetails from './MemberRowDetails';
import EditMemberModal from './EditMemberModal';
import DeleteMemberModal from './DeleteMemberModal';

type Props = {
    members: Member[];
}

export default function MemberRow({ members }: Props) {
  return (
    <div className="space-y-8">
      {members.map((member) => {
        return (
          <div key={member.memberId} className="flex items-center">
            <MemberRowDetails member={member} />
            <div className="flex ml-auto space-x-3" >
              <EditMemberModal member={member} />
              <DeleteMemberModal memberId={member.memberId} />
            </div>
          </div>
        )
      })}
    </div>
  )
}