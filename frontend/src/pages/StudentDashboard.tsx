import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function StudentDashboard() {
  return (
    <SidebarInset>
      <Header title="Student Dashboard" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Recent Quizzes</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Student Progress</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Class Statistics</span>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
          <span className="text-muted-foreground">Main Content Area</span>
        </div>
      </div>
    </SidebarInset>
  );
}
