"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore, useAppStore } from "@/lib/store";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "block rounded-xl px-3 py-2 text-sm font-medium transition",
        active ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function SidebarNav() {
  const { openWhy } = useUIStore();
  const { vision } = useAppStore();

  return (
    <div className="sticky top-4 space-y-3">
      <div className="rounded-2xl border border-neutral-200 bg-white p-3">
        <div className="text-xs font-semibold text-neutral-500">TASKS</div>
        <div className="mt-2 space-y-1">
          <NavItem href="/today" label="Today" />
          <NavItem href="/weekly" label="Weekly" />
          <NavItem href="/monthly" label="Monthly" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-3">
        <div className="text-xs font-semibold text-neutral-500">SETTINGS</div>
        <div className="mt-2 space-y-1">
          <NavItem href="/goals" label="Goals & KPIs" />
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-neutral-500">DIRECTION</div>
          <button
            onClick={openWhy}
            className="rounded-lg px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100"
          >
            Why
          </button>
        </div>

        <div className="mt-2">
          <div className="text-[11px] text-neutral-500">Vision</div>
          <div className="text-sm text-neutral-800 line-clamp-2">{vision || "Set your vision in Goals"}</div>
        </div>
      </div>
    </div>
  );
}
