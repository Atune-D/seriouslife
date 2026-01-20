"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarNav from "./SidebarNav";
import RightPanel from "./RightPanel";
import WhyPanel from "./WhyPanel";
import TaskModal from "./TaskModal";
import { useUIStore, useAppStore } from "@/lib/store";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isWhyOpen, closeWhy } = useUIStore();
  const { vision } = useAppStore();
  const [showTaskModal, setShowTaskModal] = useState(false);

  const getPageTitle = () => {
    if (pathname === "/today") return "Today";
    if (pathname === "/weekly") return "Weekly";
    if (pathname === "/monthly") return "Monthly";
    if (pathname === "/goals") return "Goals & KPIs";
    return "seriouslife";
  };

  const getPageSubtitle = () => {
    if (pathname === "/today") return "Your daily priorities";
    if (pathname === "/weekly") return "This week's focus";
    if (pathname === "/monthly") return "Monthly objectives";
    if (pathname === "/goals") return "Your life priorities, clearly laid out";
    return vision;
  };

  const showNewButton = ["/today", "/weekly", "/monthly"].includes(pathname);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-4 p-4">
          <aside className="col-span-12 md:col-span-3 lg:col-span-2">
            <SidebarNav />
          </aside>

          <main className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="sticky top-4 z-10 rounded-2xl border border-neutral-200 bg-white shadow-sm p-4 mb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
                  <p className="text-sm text-neutral-500 mt-1">{getPageSubtitle()}</p>
                </div>
                {showNewButton && (
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
                  >
                    <span className="text-lg leading-none">+</span> New
                  </button>
                )}
              </div>
            </div>

            <div>{children}</div>
          </main>

          <aside className="col-span-12 lg:col-span-3">
            <RightPanel />
          </aside>
        </div>
      </div>

      <WhyPanel open={isWhyOpen} onClose={closeWhy} />
      <TaskModal 
        open={showTaskModal} 
        onClose={() => setShowTaskModal(false)} 
        scope={pathname === "/today" ? "today" : pathname === "/weekly" ? "weekly" : "monthly"}
      />
    </div>
  );
}
