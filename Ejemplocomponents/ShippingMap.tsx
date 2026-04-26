import React from 'react';
import { motion } from 'motion/react';
import { shippingNodes, ShippingNode } from '../data/mockData';
import { ArrowRight, Building2 } from 'lucide-react';

export const ShippingMap: React.FC = () => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'alto': return 'bg-emerald-500 text-white';
      case 'medio': return 'bg-amber-500 text-white';
      case 'bajo': return 'bg-rose-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getLevelBorder = (level: string) => {
    switch (level) {
      case 'alto': return 'border-emerald-200 shadow-emerald-100';
      case 'medio': return 'border-amber-200 shadow-amber-100';
      case 'bajo': return 'border-rose-200 shadow-rose-100';
      default: return 'border-slate-200 shadow-slate-100';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[600px]" id="shipping-map-container">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Mapa Visual de Envíos</h2>
        <p className="text-slate-500">Diagrama de flujo logístico y niveles de operación por empresa</p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center items-start relative py-10" id="shipping-nodes-grid">
        {shippingNodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`w-48 p-4 rounded-2xl border-2 ${getLevelBorder(node.level)} shadow-lg bg-white relative z-10`}
            id={`shipping-node-${node.id}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${getLevelColor(node.level)}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{node.name}</h4>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${getLevelColor(node.level)}`}>
                {node.level}
              </span>
            </div>

            {node.connections.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-2">Conexiones</p>
                <div className="flex flex-wrap gap-1">
                  {node.connections.map(connId => (
                    <div key={connId} className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto" id="shipping-legend">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-xs font-medium text-slate-600">Nivel Alto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-xs font-medium text-slate-600">Nivel Medio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <span className="text-xs font-medium text-slate-600">Nivel Bajo</span>
        </div>
      </div>
    </div>
  );
};
