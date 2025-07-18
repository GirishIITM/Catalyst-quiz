import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function StudentSubmissions() {
  return (
    <SidebarInset>
      <Header title="My Submissions" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-20">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Recent Submissions</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Grades</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Performance Stats</span>
          </div>
        </div>
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
          <span className="text-muted-foreground">Submissions History</span>
        </div>
      </div>
    </SidebarInset>
  );
}
