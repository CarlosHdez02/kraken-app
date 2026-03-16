import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";

const MonthlyRevenue = () => {
  return (
    <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-amber-300/20 shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,201,56,0.18),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.12),transparent_55%)]" />
      <CardHeader className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Ingresos Mensuales
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground">
            Total estimado de pagos recibidos este mes
          </CardDescription>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/40">
          <DollarSignIcon className="size-4 text-emerald-300" />
        </div>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight text-emerald-200">
            $43,000
          </span>
          <span className="text-xs text-emerald-400">
            +18% vs. mes anterior
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyRevenue;