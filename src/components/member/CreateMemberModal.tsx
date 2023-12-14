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
import { z } from "zod"

const schema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
});

export default function CreateMemberModal() {
  const createMember = api.member.createMember.useMutation();

  const [open, setOpen] = useState(false);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const { data: duplicate } = api.member.duplicateMemberCheck.useQuery(
    {
        email: memberEmail
    },
    {
        enabled: !!memberEmail
    }
  )

  const handleSubmit = async () => {
    console.log("duplicate", duplicate)
    const data = {
        name: memberName,
        email: memberEmail
    }
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
        const path = validationResult.error.errors[0]?.path[0];
        if (path === "name") toast.error("Please enter the new member's name.");
        else if (path === "email") toast.error("Please enter a valid email.")
    } else if (duplicate) {
        toast.error("Email already in use :(");
    } else {
        toast.promise(createMember.mutateAsync({ name: memberName, email: memberEmail }), {
            loading: "Adding member...",
            success:  () => {
                // Reload the page upon successful submission
                router.replace(`/`).catch(console.error);
                setOpen(false);
                return "Member added :)";
            },
            error: "Failed to add member :("
        })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
            <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new member</DialogTitle>
          <DialogDescription>
            You can assign member to teams later.
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
                handleSubmit();
            }}
          >
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
