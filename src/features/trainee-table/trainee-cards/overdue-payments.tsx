import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const OverduePayments = () => {
  return (
    <Card className="relative overflow-hidden bg-card/40 backdrop-blur-xl border border-amber-300/20 shadow-[0_18px_45px_rgba(0,0,0,0.85)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,113,113,0.22),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(255,201,56,0.08),transparent_55%)]" />
      <CardHeader className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">
            Pagos Vencidos
          </CardTitle>
          <CardDescription className="text-[11px] text-muted-foreground">
            Alumnos con mensualidad pendiente de pago
          </CardDescription>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-400/40">
          <AlertCircle className="size-4 text-red-300" />
        </div>
      </CardHeader>
      <CardContent className="relative pt-2">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-semibold tracking-tight text-red-200">
            3
          </span>
          <span className="text-xs text-red-300">
            Urgente dar seguimiento
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverduePayments;