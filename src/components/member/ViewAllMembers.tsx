import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Member } from '@prisma/client';
import MemberRow from './MemberRow';
// import CreateMemberModal from './CreateMemberModal';

type Props = {
    members: Member[];
}

export default function ViewAllMembers({ members }: Props) {
  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle className="flex">
                    <div className="flex" >
                        Members
                    </div>
                    <div className="ml-auto">
                        {/* <CreateMemberModal /> */}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MemberRow members={members} />
            </CardContent>
        </Card>
    </>
  )
}