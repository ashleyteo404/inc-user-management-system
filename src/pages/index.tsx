import type { Member, Team } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Navbar from "~/components/Navbar";
import ViewAllMembers from "~/components/member/ViewAllMembers";
import ViewAllTeams from "~/components/team/ViewAllTeams";
import { db } from "~/server/db";

type Props = {
  teams: Team[];
  members: Member[];
}

export default function Home({ teams, members }: Props) {
  return (
    <>
      <Navbar />
      <div className="flex mt-2">
        <div className="flex-grow m-2">
          <ViewAllTeams teams={teams} />
        </div>
        <div className="flex-grow m-2">
          <ViewAllMembers members={members} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const allTeams = await db.team.findMany({
    orderBy: {
      name: "asc"
    }
  });

  const allMembers = await db.member.findMany({
    orderBy: {
      name: "asc"
    }
  })

  return {
    props: {
      teams: JSON.parse(JSON.stringify(allTeams)) as Team[],
      members: JSON.parse(JSON.stringify(allMembers)) as Member[]
    }
  }
}