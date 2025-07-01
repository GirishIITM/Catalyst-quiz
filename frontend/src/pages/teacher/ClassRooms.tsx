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
import { Plus } from "lucide-react";
import Header from "@/components/header";
import { classroomStore } from "@/states/teacher";
import { teacherApi } from "@/api";
import { loadingStore } from "@/states/loading";
import toast from "react-hot-toast";
import { SidebarInset } from "@/components/ui/sidebar";

interface CreateClassroomForm {
    name: string;
}

function TeacherClassRooms() {
    const [open, setOpen] = useState(false);
    const { classrooms, fetchClassrooms } = classroomStore();
    const form = useForm<CreateClassroomForm>();

    useEffect(() => {
        fetchClassrooms();
    }, []);

    const onSubmit = async (data: CreateClassroomForm) => {
        try {
            loadingStore.getState().setLoading(true);
            await teacherApi.createClassroom(data);
            toast.success("Classroom created successfully");
            setOpen(false);
            form.reset();
            await fetchClassrooms();
        } catch (error) {
            toast.error("Failed to create classroom");
        } finally {
            loadingStore.getState().setLoading(false);
        }
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

                {classrooms.length === 0 ? (
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
                        {classrooms.map((classroom) => (
                            <Card key={classroom.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>{classroom.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">ID: {classroom.id}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>  </SidebarInset>
    );
}

export default TeacherClassRooms;