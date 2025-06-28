import Header from "@/components/header";
import { SidebarInset } from "@/components/ui/sidebar";

export default function CreateQuiz() {
  return (
    <SidebarInset>
      <Header title="Create Quiz" />
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-20">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Quiz Settings</span>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground">Question Preview</span>
          </div>
        </div>
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
          <span className="text-muted-foreground">Quiz Builder Interface</span>
        </div>
      </div>
    </SidebarInset>
  );
}
