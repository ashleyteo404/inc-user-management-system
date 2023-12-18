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
import { PencilIcon } from "lucide-react"
import { useState } from "react"
import { api } from "~/utils/api"
import { toast } from "sonner"
import router from "next/router"
import { z } from "zod"
import { Member } from "@prisma/client"
import { memberSchema } from "~/types/schema"
import { TRPCClientError } from "@trpc/client"

type Props = {
  member: Member
}

export default function EditMemberModal({ member }: Props) {
  const updateMember = api.member.updateMember.useMutation();

  const [open, setOpen] = useState(false);

  const [memberName, setMemberName] = useState(member.name);
  const [memberEmail, setMemberEmail] = useState(member.email);

  const handleSubmit = async () => {
    const data = {
      name: memberName,
      email: memberEmail
    }
    const validationResult = memberSchema.safeParse(data);
    if (!validationResult.success) {
        const path = validationResult.error.errors[0]?.path[0];
        if (path === "name") toast.error("Please enter a name.");
        else if (path === "email") toast.error("Please enter a valid email.")
    } else {
      toast.promise(updateMember.mutateAsync({ memberId: member.memberId, ...data }), {
        loading: "Updating member...",
        success: () => {
          // Reload the page upon successful submission
          router.replace(`/`).catch(console.error);
          setOpen(false);
          return "Member updated :)";
        },
        error: (error) => { 
          if (error instanceof TRPCClientError) {
            return error.message;
          } else {
            return "Failed to update member :(";
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
          <DialogTitle>Edit member</DialogTitle>
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
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
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
            onClick={() => {
              if (memberName === member.name && memberEmail === member.email) {
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
