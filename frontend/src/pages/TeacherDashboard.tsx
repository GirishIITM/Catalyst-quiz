import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function TeacherDashboard() {
  return (
    <SidebarInset>
      <Header title="Teacher Dashboard" />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-20">
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
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center"
          >
            <span className="text-muted-foreground">
              Additional Content {i + 1}
            </span>
          </div>
        ))}
      </div>
    </SidebarInset>
  );
}
