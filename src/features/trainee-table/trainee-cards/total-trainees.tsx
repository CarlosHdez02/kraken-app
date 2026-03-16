import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";

const TotalTrainees = () => {
  return (
    <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-amber-300/20 shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,56,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,201,56,0.06),transparent_55%)]" />
      <CardHeader className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Alumnos Totales
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground">
            Registrados en Kraken&apos;s Bay Studio
          </CardDescription>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-amber-300/15 ring-1 ring-amber-200/30">
          <UsersIcon className="size-4 text-amber-200" />
        </div>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight text-amber-100">
            58
          </span>
          <span className="text-xs text-emerald-400">
            +12 en los últimos 30 días
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalTrainees;
