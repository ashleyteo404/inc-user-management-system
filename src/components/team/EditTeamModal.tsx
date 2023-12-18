import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PencilIcon } from 'lucide-react';
import { useState } from "react"
import { api } from "~/utils/api"
import { toast } from "sonner"
import router from "next/router"
import { Team } from "@prisma/client";
import { teamSchema } from "~/types/schema";
import { TRPCClientError } from "@trpc/client";

type Props = {
    team: Team
}

export default function EditTeamModal({ team }: Props) {
  const updateTeam = api.team.updateTeam.useMutation();

  const [open, setOpen] = useState(false);

  const [teamName, setTeamName] = useState(team.name);

  const handleSubmit = async () => {
    const data = {
      name: teamName,
    }
    const validationResult = teamSchema.safeParse(data);

    if (!validationResult.success) {
      const path = validationResult.error.errors[0]?.path[0];
      if (path === "name") toast.error("Please enter a name.");
    } else {
      toast.promise(updateTeam.mutateAsync({ teamId: team.teamId, ...data }), {
        loading: "Updating team...",
        success:  () => {
          // Reload the page upon successful submission
          router.replace(`/`).catch(console.error);
          setOpen(false);
          return "Team updated :)";
        },
        error: (error) => { 
          if (error instanceof TRPCClientError) {
            return error.message;
          } else {
            return "Failed to update team :(";
          }
        }
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
          <DialogDescription>
            Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button 
                type="button"
                variant="secondary"
            >
                Cancel
            </Button>
          </DialogClose>
          <Button 
              type="submit"
              onClick={async () => {
                  if (teamName === team.name) {
                      toast("No changes detected");
                      return;
                  }
                  handleSubmit();
              }}
          >
              Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
