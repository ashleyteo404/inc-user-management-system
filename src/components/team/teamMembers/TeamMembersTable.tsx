import React from 'react'
import { Team } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MemberWithTeamMemberId } from '~/types/types';
import RemoveTeamMemberModal from './RemoveTeamMemberModal';

type Props = {
  team: Team;
  members: MemberWithTeamMemberId[];
}

export default function TeamMembersTable ({ team, members }: Props) {
  console.log("members", members)
  console.log("member", members[2])

  return (
    <div className="m-4">
      <Table>
        <TableCaption>{team.name}'s Members</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={member.memberId}>
              <TableCell className="font-medium">{index+1}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell><RemoveTeamMemberModal teamMemberId={member.teamMemberId} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Members</TableCell>
            <TableCell className="text-right">{members.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

