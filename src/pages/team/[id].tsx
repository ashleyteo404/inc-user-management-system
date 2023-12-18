import React from 'react'
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Team, Member } from '@prisma/client';
import { db } from '~/server/db';
import TeamMembersTable from '~/components/team/teamMembers/TeamMembersTable';
import AddTeamMember from '~/components/team/teamMembers/AddTeamMember';
import { MemberWithTeamMemberId } from '~/types/types';
import Navbar from '~/components/Navbar';

type Props = {
  team: Team;
  members: MemberWithTeamMemberId[];
}

export default function TeamMembers ({ team, members }: Props) {
  console.log("members", members)
  return (
    <>
      <Navbar />
      <div>
        <h1 className="font-bold text-4xl m-4">{team.name}'s Members</h1>
      </div>
      <AddTeamMember teamId={team.teamId} />
      <TeamMembersTable team={team} members={members} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async (ctx) => {
  const { id } = ctx.query;

  if (!id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const team = await db.team.findFirst({
    where: {
      teamId: id as string
    }
  })

  const teamMembers = await db.teamMember.findMany({
    where: {
      teamId: id as string
    }
  });

  const memberIds = teamMembers.map((teamMember) => teamMember.memberId);

  // prisma does not currently allow aliases without raw db access
  // without an alias, if the name of the id column in the Member table is memberId, 
  // then the id from teamMember will replace the id of Member in the return data
  // as they have the same name

  const unformattedMembers = await db.member.findMany({
    where: { memberId: { in: memberIds } },
    include: {
      team: {
        where: { teamId: id as string },
        select: {
          teamMemberId: true
        }
      }
    }
  });

  const formattedMembers = unformattedMembers.map((member) => ({
    ...member,
    teamMemberId: member.team.map((teamItem) => teamItem.teamMemberId)[0],
  }));

  return {
    props: {
      team: JSON.parse(JSON.stringify(team)) as Team,
      members: JSON.parse(JSON.stringify(formattedMembers)) as MemberWithTeamMemberId[],
    },
  };
};