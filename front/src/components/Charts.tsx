
import { LabelList, Cell, Line, Bar, Area, AreaChart as RechartsAreaChart, BarChart as RechartsBarChart, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', value: 400, users: 2400, revenue: 2400 },
  { name: 'Feb', value: 300, users: 1398, revenue: 2210 },
  { name: 'Mar', value: 200, users: 9800, revenue: 2290 },
  { name: 'Apr', value: 278, users: 3908, revenue: 2000 },
  { name: 'May', value: 189, users: 4800, revenue: 2181 },
  { name: 'Jun', value: 239, users: 3800, revenue: 2500 },
  { name: 'Jul', value: 349, users: 4300, revenue: 2100 },
  { name: 'Aug', value: 430, users: 4300, revenue: 2400 },
  { name: 'Sep', value: 360, users: 5000, revenue: 2780 },
  { name: 'Oct', value: 380, users: 4090, revenue: 3000 },
  { name: 'Nov', value: 460, users: 4190, revenue: 3200 },
  { name: 'Dec', value: 510, users: 5200, revenue: 3500 },
];

export function AreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Area type="monotone" dataKey="users" stackId="1" stroke="#00000" fill="#8b5cf6" fillOpacity={0.6} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}


const platformData = [
  { name: 'Contento', value: 45, color: '#008000' },
  { name: 'Neutral', value: 5, color: '#f1c40f' },
  { name: 'Confundido', value: 5, color: '#9b59b6' },
  { name: 'Decepcionado', value: 12, color: '#e67e22' },
  { name: 'Enfadado', value: 38, color: '#e74c3c' },
];

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={platformData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {platformData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
