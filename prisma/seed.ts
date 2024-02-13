import { type Prisma, PrismaClient } from "@prisma/client";
import { members } from "./data/members";
import { teams } from "./data/teams";

const prisma = new PrismaClient();

// reset database first by deleting all records
await prisma.teamMember.deleteMany({});
await prisma.team.deleteMany({});
await prisma.member.deleteMany({});

await prisma.account.deleteMany({});
await prisma.session.deleteMany({});
await prisma.verificationToken.deleteMany({});
await prisma.user.deleteMany({});

// populate database
async function main() {
    // create users
    await prisma.member.createMany({
        data: members
    })

    // retrieve memberIds
    let memberIds: string[] = [];
    const memberIdsObject = await prisma.member.findMany({ select: { memberId: true }});
    memberIds = memberIdsObject.map(member => member.memberId);

    for (const team of teams) {
        // create team
        const newTeam = await prisma.team.create({
            data: team
        });

        // randomly choose users to be team members for a team
        const selectedMemberIds: number[] = [];
        while (selectedMemberIds.length < 3) {
            const index = Math.floor(Math.random() * memberIds.length);
            if (!selectedMemberIds.includes(index)) selectedMemberIds.push(index);
        }

        // define team member data for each team
        const teamMemberData: Prisma.TeamMemberCreateManyInput | Prisma.TeamMemberCreateManyInput[] = [
            {
                teamId: newTeam.teamId,
                memberId: memberIds[selectedMemberIds[0]!]!
            },
            {
                teamId: newTeam.teamId,
                memberId: memberIds[selectedMemberIds[1]!]!
            },
            {
                teamId: newTeam.teamId,
                memberId: memberIds[selectedMemberIds[2]!]!
            }
        ];
    
        // create team member record for a team
        await prisma.teamMember.createMany({
            data: teamMemberData,
        });
    }
}

main()
.catch((e) => {
    console.log(e);
    process.exit(1);
})
.finally(() => {prisma.$disconnect().catch(console.error);})