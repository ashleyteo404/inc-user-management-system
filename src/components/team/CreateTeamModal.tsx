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
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { api } from "~/utils/api"
import { toast } from "sonner"
import router from "next/router"

export default function CreateTeamModal() {
  const createTeam = api.team.createTeam.useMutation();

  const [teamName, setTeamName] = useState("");

  const { data: duplicate } = api.team.duplicateTeamCheck.useQuery(
    {
        name: teamName
    },
    {
        enabled: !!teamName
    }
  )

  const handleSubmit = async () => {
    console.log("duplicate", duplicate)
    if (duplicate) {
        toast.error("Team name already taken :(");
    } else {
        toast.promise(createTeam.mutateAsync({ name: teamName }), {
            loading: "Creating team...",
            success:  () => {
                // Reload the page upon successful submission
                router.replace(`/`).catch(console.error);
                return "Team created :)";
            },
            error: "Failed to create team :("
        })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            You can assign team members later.
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
                onClick={() => {
                    handleSubmit();
                }}
            >
                Create Team
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
