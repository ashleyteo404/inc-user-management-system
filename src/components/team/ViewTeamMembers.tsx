// import React from 'react'
// import { Team, TeamMember } from '@prisma/client';
// import {
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from '../ui/button';
// import { GetServerSideProps } from 'next';
// import { api } from '~/utils/api';
// import { ParsedUrlQuery } from 'querystring';

// type Props = {
//     team: Team;
//     teamMembers?: TeamMember[];
// }

// export default function ViewTeamMembers({ team }: Props) {

//     const allTeamMembers = api.teamMember.getTeamMembers.useQuery({
//         teamId: team.id
//     })

//   return (
//     <DialogContent>
//       <DialogHeader>
//         <DialogTitle>{team.name}'s Members</DialogTitle>
//         <DialogDescription>
//           This action cannot be undone. This will permanently delete your account
//           and remove your data from our servers.
//         </DialogDescription>
//       </DialogHeader>
//       <DialogFooter>
//           <DialogClose asChild>
//             <Button 
//                 type="button"
//                 variant="secondary"
//             >
//                 Close
//             </Button>
//           </DialogClose>
//       </DialogFooter>
//     </DialogContent>
//   )
// }

// export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery> = async ({ query }) => {
//     // Extract the teamId from the query parameters
//     const { teamId } = query;
  
//     if (!teamId || Array.isArray(teamId)) {
//       // If teamId is missing or an array (not a valid teamId), return an empty teamMembers array
//       return {
//         props: {
//           team: {},
//           teamMembers: [],
//         },
//       };
//     }
  
//     // // Fetch the team using the teamId
//     // const team = await api.team.getTeamById.useQuery({ id: teamId as string });
  
//     // if (!team) {
//     //   // If the team is not found, return an empty teamMembers array
//     //   return {
//     //     props: {
//     //       team: {},
//     //       teamMembers: [],
//     //     },
//     //   };
//     // }
  
//     // Fetch the team members based on the teamId
//     const teamMembers = await api.teamMember.getTeamMembers.useQuery({
//       teamId: teamId as string,
//     });
  
//     return {
//       props: {
//         teamMembers: JSON.parse(JSON.stringify(teamMembers)) as TeamMember[],
//       },
//     };
//   };
// // export const getServerSideProps: GetServerSideProps<Props> = async ({ team }: Props) => {
// //     const allTeamMembers = await api.teamMember.getTeamMembers.useQuery({
// //         teamId: team.id
// //     })

// //     return {
// //         props: {
// //             team: team,
// //             teamMembers: JSON.parse(JSON.stringify(allTeamMembers)) as TeamMember[],
// //         }
// //     }
// // }