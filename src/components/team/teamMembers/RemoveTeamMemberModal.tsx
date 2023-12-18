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
import { Trash2Icon } from 'lucide-react';
import { api } from "~/utils/api"
import { toast } from "sonner"
import router from "next/router"
import { TRPCClientError } from "@trpc/client";

type Props = {
  teamMemberId: string
}

export default function RemoveTeamMemberModal({ teamMemberId }: Props) {
  const removeTeamMember = api.teamMember.removeTeamMember.useMutation();

  const handleSubmit = async () => {
    toast.promise(removeTeamMember.mutateAsync({ teamMemberId: teamMemberId }), {
        loading: "Removing member...",
        success:  () => {
          router.reload();
          return "Member removed from team :)";
        },
        error: (error) => { 
          if (error instanceof TRPCClientError) {
            return error.message;
          } else {
            return "Failed to remove member from team :(";
          }
        }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <Trash2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        <DialogDescription>
            You can still add this member back to this team if need be later.
        </DialogDescription>
        </DialogHeader>
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
                    handleSubmit();
                }}
            >
                Remove Member
            </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
