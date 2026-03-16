import { UsersIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ActiveTrainees = () => {
  return (
    <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-amber-300/20 shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,56,0.16),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(255,201,56,0.08),transparent_55%)]" />
      <CardHeader className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Activos
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground">
            Alumnos con membresía vigente este mes
          </CardDescription>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-amber-300/15 ring-1 ring-amber-200/30">
          <UsersIcon className="size-4 text-amber-200" />
        </div>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight text-amber-100">
            42
          </span>
          <span className="text-xs text-emerald-400">
            +6 este mes
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTrainees;