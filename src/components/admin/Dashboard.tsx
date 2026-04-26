import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { VisitasCharts } from "./VisitasCharts";
import { VentasCharts } from "./VentasCharts";
import { MarketingCharts } from "./MarketingCharts";
import { ShippingMap } from "./ShippingMap";
import {
  initialVisitas,
  initialVentas,
  initialMarketing,
} from "../../data/mockData";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [visitas, setVisitas] = useState(initialVisitas);
  const [ventas, setVentas] = useState(initialVentas);
  const [marketing, setMarketing] = useState(initialMarketing);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data update
    setTimeout(() => {
      setVisitas(
        [...visitas].map((v) => ({
          ...v,
          tiempoSitio: Math.floor(Math.random() * 60),
        })),
      );
      setVentas(
        [...ventas].map((v) => ({
          ...v,
          ventasRealizadas: Math.floor(Math.random() * 15),
        })),
      );
      setMarketing(
        [...marketing].map((m) => ({
          ...m,
          ingresos: m.ingresos + (Math.random() * 1000 - 500),
        })),
      );
      setIsRefreshing(false);
    }, 1000);
  };

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketing((prev) => {
        const last = prev[prev.length - 1];
        return [
          ...prev.slice(1),
          { ...last, ingresos: last.ingresos + (Math.random() * 100 - 50) },
        ];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8" id="dashboard-main">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Ingresos Totales"
                value="$1.2M"
                change="+12.5%"
                icon={DollarSign}
                trend="up"
              />
              <StatCard
                title="Clientes Nuevos"
                value="1,284"
                change="+3.2%"
                icon={Users}
                trend="up"
              />
              <StatCard
                title="Tasa de Conversión"
                value="4.8%"
                change="-0.4%"
                icon={TrendingUp}
                trend="down"
              />
              <StatCard
                title="Actividad Reciente"
                value="84%"
                change="+5.1%"
                icon={Activity}
                trend="up"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VisitasCharts data={visitas} />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Resumen de Ventas
                </h3>
                <VentasCharts data={ventas} />
              </div>
            </div>
          </div>
        );
      case "visitas":
        return <VisitasCharts data={visitas} />;
      case "ventas":
        return <VentasCharts data={ventas} />;
      case "marketing":
        return <MarketingCharts data={marketing} />;
      case "shipping":
        return <ShippingMap />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50" id="dashboard-layout">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 capitalize">
              {activeTab.replace("-", " ")}
            </h1>
            <p className="text-slate-500">Bienvenido de nuevo, Analista</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                22030012@itesa.edu.mx
              </p>
              <p className="text-xs text-slate-500">Administrador</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              JD
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon className="w-6 h-6 text-slate-600" />
      </div>
      <div
        className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          trend === "up"
            ? "bg-emerald-50 text-emerald-600"
            : "bg-rose-50 text-rose-600",
        )}
      >
        {trend === "up" ? (
          <ArrowUpRight className="w-3 h-3" />
        ) : (
          <ArrowDownRight className="w-3 h-3" />
        )}
        {change}
      </div>
    </div>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <h4 className="text-2xl font-bold text-slate-900 mt-1">{value}</h4>
  </div>
);
