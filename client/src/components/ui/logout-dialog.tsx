import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface LogoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutDialog({ open, onOpenChange, onConfirm }: LogoutDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="glassmorphism-strong border-warm-400/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-warm-800 flex items-center">
            <LogOut className="w-5 h-5 mr-2 text-destructive" />
            Confirm Logout
          </AlertDialogTitle>
          <AlertDialogDescription className="text-warm-600">
            Are you sure you want to log out? You'll need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-warm-200 border-warm-400 text-warm-800 hover:bg-warm-300">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            Yes, Log Out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}