export interface VisitaData {
  fecha: string;
  tiempoSitio: number;
  correosEnviados: number;
  whatsapp: number;
  clientesNuevos: number;
  contactoGuardado: boolean;
}

export interface VentasData {
  vistasGoogle: number;
  llamadasRecibidas: number;
  llamadasRealizadas: number;
  citasAgendadas: number;
  citasCompletadas: number;
  ventasRealizadas: number;
}

export interface MarketingData {
  ingresos: number;
  gastoPublicidad: number;
  clicks: number;
  conversiones: number;
  seguidores: number;
  interacciones: number;
  resenas: number;
}

export interface ShippingNode {
  id: string;
  name: string;
  level: 'alto' | 'medio' | 'bajo';
  connections: string[];
}

// Helper to generate random data based on OCR patterns
const generateVisitas = (count: number): VisitaData[] => {
  const data: VisitaData[] = [];
  const start = new Date('2025-08-20');
  for (let i = 0; i < count; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    data.push({
      fecha: date.toISOString().split('T')[0],
      tiempoSitio: Math.floor(Math.random() * 60),
      correosEnviados: Math.floor(Math.random() * 50),
      whatsapp: Math.floor(Math.random() * 100),
      clientesNuevos: Math.floor(Math.random() * 20),
      contactoGuardado: Math.random() > 0.5,
    });
  }
  return data;
};

const generateVentas = (count: number): VentasData[] => {
  return Array.from({ length: count }, () => ({
    vistasGoogle: Math.floor(Math.random() * 1000),
    llamadasRecibidas: Math.floor(Math.random() * 30),
    llamadasRealizadas: Math.floor(Math.random() * 30),
    citasAgendadas: Math.floor(Math.random() * 25),
    citasCompletadas: Math.floor(Math.random() * 25),
    ventasRealizadas: Math.floor(Math.random() * 15),
  }));
};

const generateMarketing = (count: number): MarketingData[] => {
  return Array.from({ length: count }, () => ({
    ingresos: Math.floor(Math.random() * 50000),
    gastoPublicidad: Math.floor(Math.random() * 10000),
    clicks: Math.floor(Math.random() * 2000),
    conversiones: Math.floor(Math.random() * 100),
    seguidores: Math.floor(Math.random() * 50000),
    interacciones: Math.floor(Math.random() * 5000),
    resenas: Math.floor(Math.random() * 50),
  }));
};

export const initialVisitas = generateVisitas(100);
export const initialVentas = generateVentas(100);
export const initialMarketing = generateMarketing(100);

export const shippingNodes: ShippingNode[] = [
  { id: '1', name: 'Logística Central', level: 'alto', connections: ['2', '3', '4'] },
  { id: '2', name: 'Distribuidora Norte', level: 'medio', connections: ['5', '6'] },
  { id: '3', name: 'Almacén Sur', level: 'bajo', connections: ['7'] },
  { id: '4', name: 'Transportes Express', level: 'alto', connections: ['8', '9'] },
  { id: '5', name: 'Retailer A', level: 'medio', connections: [] },
  { id: '6', name: 'Retailer B', level: 'bajo', connections: [] },
  { id: '7', name: 'Retailer C', level: 'alto', connections: [] },
  { id: '8', name: 'E-commerce Hub', level: 'alto', connections: [] },
  { id: '9', name: 'Punto de Venta D', level: 'medio', connections: [] },
];
