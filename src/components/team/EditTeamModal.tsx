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

type Props = {
    team: Team
}

export default function EditTeamModal({ team }: Props) {
  const updateTeam = api.team.updateTeam.useMutation();

  const [teamName, setTeamName] = useState(team.name);

  const { data: duplicate } = api.team.duplicateTeamCheck.useQuery(
    {
        name: teamName
    },
    {
        enabled: teamName !== team.name
    }
  )

  const handleSubmit = async () => {
    console.log("duplicate", duplicate)
    if (duplicate) {
        toast.error("Team name already taken :(");
    } else {
        toast.promise(updateTeam.mutateAsync({ id: team.id, name: teamName }), {
            loading: "Updating team...",
            success:  () => {
                // Reload the page upon successful submission
                router.replace(`/`).catch(console.error);
                return "Team updated :)";
            },
            error: "Failed to update team :("
        })
    }
  }

  return (
    <Dialog>
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
          <DialogClose asChild>
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
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
