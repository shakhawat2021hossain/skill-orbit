import UsersTable from "@/components/modules/admin/UsersTable";
import { getUsers } from "@/services/user/getAllUser";
import { IUser } from "@/types/user";

export default async function AdminUserManagementPage() {
  const users = await getUsers();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage all users on the platform</p>
        </div>

        {/* Pass users as props to client table */}
        <UsersTable initialUsers={users as IUser[]} />
      </div>
    </div>
  );
}







{/* Delete Confirmation Dialog */ }
{/* <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Delete User
        </DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <span className="font-semibold">{deleteDialog.userName}</span>?
          This action cannot be undone. All user data will be permanently removed.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" onClick={() => setDeleteDialog({ ...deleteDialog, open: false })}>
          Cancel
        </Button>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog> */}

