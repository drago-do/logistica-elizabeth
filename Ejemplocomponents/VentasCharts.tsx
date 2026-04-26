import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, ComposedChart, Area, Legend 
} from 'recharts';
import { VentasData } from '../data/mockData';

export const VentasCharts: React.FC<{ data: VentasData[] }> = ({ data }) => {
  const chartData = data.slice(0, 12); // First 12 entries

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="ventas-charts">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="ventas-composed">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Embudo de Ventas (Vistas vs Ventas)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Area type="monotone" dataKey="vistasGoogle" name="Vistas Google" fill="#3b82f6" fillOpacity={0.1} stroke="#3b82f6" />
              <Bar dataKey="ventasRealizadas" name="Ventas" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="ventas-citas">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Efectividad de Citas</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar dataKey="citasAgendadas" name="Agendadas" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="citasCompletadas" name="Completadas" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2" id="ventas-llamadas">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Flujo de Llamadas</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis fontSize={12} axisLine={false} tickLine={false} />
              <YAxis fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="llamadasRecibidas" name="Recibidas" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="llamadasRealizadas" name="Realizadas" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
