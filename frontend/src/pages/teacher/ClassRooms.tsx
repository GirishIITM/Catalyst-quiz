import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, UserPlus, Trash2, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Header from "@/components/header";
import { classroomStore } from "@/states/teacher";
import { teacherApi } from "@/api";
import { loadingStore } from "@/states/loading";
import toast from "react-hot-toast";
import { SidebarInset } from "@/components/ui/sidebar";
import type { CreateClassroomForm, InviteStudentForm, StudentSuggestion } from "@/types/teacher.types";


function TeacherClassRooms() {
  const [open, setOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedClassroomId, setSelectedClassroomId] = useState<string>("");
  const [classroomToDelete, setClassroomToDelete] = useState<string>("");
  const [studentQuery, setStudentQuery] = useState("");
  const [suggestions, setSuggestions] = useState<StudentSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const { classroomsStudents, fetchClassroomsStudents, deleteClassroom, inviteStudent } = classroomStore();
  const form = useForm<CreateClassroomForm>();
  const inviteForm = useForm<InviteStudentForm>();

  useEffect(() => {
    fetchClassroomsStudents();
  }, []);

  const onSubmit = async (data: CreateClassroomForm) => {
    try {
      loadingStore.getState().setLoading(true);
      await teacherApi.createClassroom(data);
      toast.success("Classroom created successfully");
      setOpen(false);
      form.reset();
      await fetchClassroomsStudents();
    } catch (error) {
      toast.error("Failed to create classroom");
    } finally {
      loadingStore.getState().setLoading(false);
    }
  };

  useEffect(() => {
    if (inviteOpen && studentQuery.length > 1) {
      setLoadingSuggestions(true);
      teacherApi.searchStudents(studentQuery)
        .then((res) => {
          setSuggestions(Array.isArray(res) ? res : []);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoadingSuggestions(false));
    } else {
      setSuggestions([]);
    }
  }, [studentQuery, selectedClassroomId, inviteOpen]);

  useEffect(() => {
    if (!inviteOpen) setSelectedSuggestion(null);
  }, [inviteOpen]);

  const onInviteSubmit = async (data: InviteStudentForm) => {
    if (!selectedClassroomId) return;
    loadingStore.getState().setLoading(true);
    try {
      await inviteStudent(selectedClassroomId, data.email);
      setInviteOpen(false);
      inviteForm.reset();
      setSelectedClassroomId("");
      setStudentQuery("");
      setSuggestions([]);
    } catch (error) {
      toast.error("Failed to invite student");
    }
  };

  const handleDeleteClassroom = async (classroomId: string) => {
    await deleteClassroom(classroomId);
    setDeleteOpen(false);
    setClassroomToDelete("");
  };

  const openDeleteDialog = (classroomId: string) => {
    setClassroomToDelete(classroomId);
    setDeleteOpen(true);
  };

  const handleInviteStudent = (classroomId: string) => {
    setSelectedClassroomId(classroomId);
    setInviteOpen(true);
  };

  const getStudentInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (index: number) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
    return colors[index % colors.length];
  };

  return (
    <SidebarInset>
      <Header />
      <div className="p-6 mt-14">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Classrooms</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Classroom
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Classroom</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Classroom name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classroom Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter classroom name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Invite Student Dialog */}
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Student</DialogTitle>
            </DialogHeader>
            <Form {...inviteForm}>
              <form onSubmit={inviteForm.handleSubmit(onInviteSubmit)} className="space-y-4">
                <FormItem>
                  <FormLabel>Search Student by Name or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type to search..."
                      value={studentQuery}
                      onChange={e => {
                        setStudentQuery(e.target.value);
                        inviteForm.setValue('email', e.target.value);
                      }}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {studentQuery.length > 1 && (
                  <div className="max-h-48 overflow-auto border rounded bg-muted p-2 text-sm">
                    {loadingSuggestions ? (
                      <div>Loading...</div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map(s => (
                        <div
                          key={s.id}
                          className={`p-2 flex items-center gap-2 cursor-pointer rounded transition \
                            ${selectedSuggestion === s.email ? "border border-blue-400" : "hover:bg-accent"}`}
                          onClick={() => {
                            inviteForm.setValue('email', s.email);
                            setStudentQuery(s.email);
                            setSelectedSuggestion(s.email);
                          }}
                        >
                          <Avatar className="w-7 h-7">
                            <AvatarFallback>
                              {getStudentInitials(s.username)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{s.username}</div>
                            <div className="text-xs text-muted-foreground">{s.email}</div>
                          </div>
                          {selectedSuggestion === s.email && (
                            <span className="ml-auto text-blue-600 font-bold text-xs">Selected</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div>No students found.</div>
                    )}
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setInviteOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Send Invitation</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Classroom</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete this classroom? This action cannot be undone and will permanently remove all associated data.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDeleteClassroom(classroomToDelete)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {classroomsStudents.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No Classrooms Yet</h2>
            <p className="text-muted-foreground mb-4">Create your first classroom to get started</p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Classroom
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classroomsStudents.map((classroom) => (
              <Card key={classroom.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{classroom.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleInviteStudent(classroom.id)}
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(classroom.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">ID: {classroom.id}</p>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{classroom.students?.length || 0} students</span>
                    </div>

                    {classroom.students && classroom.students.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Students:</p>
                        <div className="flex flex-wrap gap-1">
                          {classroom.students.slice(0, 6).map((student, index) => (
                            <Avatar key={student.id} className="w-8 h-8">
                              <AvatarFallback className={`text-xs ${getRandomColor(index)} text-white`}>
                                {getStudentInitials(student.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {classroom.students.length > 6 && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-gray-500 text-white">
                                +{classroom.students.length - 6}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </SidebarInset>
  );
}

export default TeacherClassRooms;
