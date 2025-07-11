import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function TeacherSubmissions() {
  return (
    <SidebarInset>
      <Header title="Submissions" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-19">
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
          <span className="text-muted-foreground">Teacher Submissions Page</span>
        </div>
      </div>
    </SidebarInset>
  );
}
