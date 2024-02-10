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
  memberId: string
}

export default function DeleteMemberModal({ memberId }: Props) {
  const deleteMember = api.member.deleteMember.useMutation();

  const handleSubmit = async () => {
    toast.promise(deleteMember.mutateAsync({ memberId: memberId }), {
        loading: "Deleting member...",
        success:  () => {
            // Reload the page upon successful submission
            router.replace(`/`).catch(console.error);
            return "Member deleted :)";
        },
        error: (error) => { 
          if (error instanceof TRPCClientError) {
            return error.message;
          } else {
            return "Failed to delete member :(";
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
            This action cannot be undone. This will permanently delete this member 
            and remove the member's data from our servers.
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
                  await handleSubmit();
                }}
            >
                Delete
            </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
