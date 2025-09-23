// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import { api } from '@/app/services/api';
// import type { Instruction } from '@/app/interfaces/interfaces';
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import { Download } from 'lucide-react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from 'recharts';
// import { format } from 'date-fns';

// type AnalyticsResponse = {
//   // adjust shape to your backend response
//   totalInstructions: number;
//   totalViews: number;
//   publishedCount: number;
//   dailyViews: { date: string; views: number }[]; // date ISO
//   topInstructions: { _id: string; title: string; views: number; is_published?: boolean }[];
//   instructions?: Instruction[];
// };

// const COLORS = ['#4f46e5', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'];

// export default function AnalyticsPage() {
//   const [data, setData] = useState<AnalyticsResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [daysRange, setDaysRange] = useState<number>(30); // last N days filter

//   useEffect(() => {
//     let mounted = true;
//     const fetchAnalytics = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // Use your actual api function name. This is a placeholder.
//         // Expecting an object shaped like AnalyticsResponse above.
//         const res = await api.getAnalytics?.() ?? (await api.getDashboard?.());
//         if (!mounted) return;

//         // Normalize / map res to our expected shape if needed.
//         // If your API returns a different shape, adapt this mapping.
//         // Below we try to be defensive.
//         const normalized: AnalyticsResponse = {
//           totalInstructions:
//             (res.totalInstructions as number) ??
//             ((res.instructions?.length as number) ?? (res.length as number) ?? 0),
//           totalViews: (res.totalViews as number) ?? 0,
//           publishedCount: (res.publishedCount as number) ?? (res.instructions?.filter((i: any) => i.is_published).length ?? 0),
//           dailyViews: (res.dailyViews as any) ?? [],
//           topInstructions: (res.topInstructions as any) ?? (res.instructions ? res.instructions.map((i: any) => ({ _id: i._id, title: i.title, views: i.views_count || 0, is_published: i.is_published })) : []),
//           instructions: res.instructions ?? undefined,
//         };

//         setData(normalized);
//       } catch (err: any) {
//         console.error('Analytics fetch error', err);
//         setError(err?.message ?? 'Failed to load analytics');
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchAnalytics();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // filter dailyViews to last daysRange days and ensure sorted asc
//   const dailyViews = useMemo(() => {
//     if (!data?.dailyViews) return [];
//     const arr = data.dailyViews.slice();
//     arr.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//     if (arr.length === 0) return [];
//     // if provided daily data longer than required, slice the tail
//     return arr.slice(-daysRange).map(d => ({ ...d, date: format(new Date(d.date), 'MM-dd') }));
//   }, [data, daysRange]);

//   const topByViews = useMemo(() => {
//     if (!data?.topInstructions) return [];
//     return data.topInstructions
//       .slice()
//       .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
//       .slice(0, 8);
//   }, [data]);

//   const publishedVsDraft = useMemo(() => {
//     if (!data) return [{ name: 'Published', value: 0 }, { name: 'Draft', value: 0 }];
//     const published = data.publishedCount ?? (data.instructions?.filter(i => i.is_published).length ?? 0);
//     const total = data.totalInstructions ?? (data.instructions?.length ?? 0);
//     const draft = Math.max(0, (total - published));
//     return [
//       { name: 'Published', value: published },
//       { name: 'Draft', value: draft },
//     ];
//   }, [data]);

//   const exportCsv = () => {
//     if (!data) return;
//     const headers = ['id', 'title', 'views', 'published', 'createdAt', 'updatedAt'];
//     const rows = (data.instructions ?? data.topInstructions ?? []).map((i: any) => [
//       i._id ?? '',
//       (i.title ?? '').replace(/\n/g, ' '),
//       String(i.views ?? i.views_count ?? 0),
//       i.is_published ? 'published' : 'draft',
//       i.createdAt ?? '',
//       i.updatedAt ?? '',
//     ]);
//     const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.setAttribute('download', `analytics-export-${new Date().toISOString().slice(0,10)}.csv`);
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return (
//       <div className="container mx-auto p-6 space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="h-28 p-4 border rounded-md animate-pulse bg-card" />
//           <div className="h-28 p-4 border rounded-md animate-pulse bg-card" />
//           <div className="h-28 p-4 border rounded-md animate-pulse bg-card" />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="h-80 p-4 border rounded-md animate-pulse bg-card" />
//           <div className="h-80 p-4 border rounded-md animate-pulse bg-card" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="text-red-600">Error loading analytics: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <header className="flex items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold">Analytics</h1>
//           <p className="text-sm text-muted-foreground">Overview of instruction performance</p>
//         </div>

//         <div className="flex items-center gap-2">
//           <Input
//             type="number"
//             value={daysRange}
//             onChange={(e) => setDaysRange(Math.max(7, Math.min(180, Number(e.target.value || 30))))}
//             className="w-28"
//             aria-label="Days range"
//             placeholder="days"
//           />
//           <Button onClick={exportCsv} variant="outline">
//             <Download className="mr-2 h-4 w-4" /> Export CSV
//           </Button>
//         </div>
//       </header>

//       {/* Top stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total instructions</CardTitle>
//             <CardDescription>All instructions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{data?.totalInstructions ?? 0}</div>
//             <div className="text-sm text-muted-foreground mt-1">Total across your account</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total views</CardTitle>
//             <CardDescription>Aggregated views</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold">{data?.totalViews ?? 0}</div>
//             <div className="text-sm text-muted-foreground mt-1">Views in selected timeframe</div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Published</CardTitle>
//             <CardDescription>Published vs drafts</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center gap-4">
//               <div className="text-3xl font-bold">{publishedVsDraft[0].value ?? 0}</div>
//               <div className="text-sm text-muted-foreground">of {data?.totalInstructions ?? 0}</div>
//             </div>
//             <div className="mt-3">
//               <Badge variant="outline" className="bg-green-100 text-green-800 mr-2">{publishedVsDraft[0].value}</Badge>
//               <Badge variant="outline" className="bg-gray-100 text-gray-600">{publishedVsDraft[1].value}</Badge>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Views over time ({daysRange} days)</CardTitle>
//             <CardDescription>Daily views</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {dailyViews.length === 0 ? (
//               <div className="text-sm text-muted-foreground">No daily views data available.</div>
//             ) : (
//               <div style={{ width: '100%', height: 320 }}>
//                 <ResponsiveContainer>
//                   <LineChart data={dailyViews}>
//                     <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                     <YAxis allowDecimals={false} />
//                     <Tooltip formatter={(value: any) => [value, 'Views']} labelFormatter={(label) => `Day: ${label}`} />
//                     <Line type="monotone" dataKey="views" stroke="#4f46e5" strokeWidth={2} dot={false} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Published vs Draft</CardTitle>
//             <CardDescription>Distribution</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div style={{ width: '100%', height: 320 }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={publishedVsDraft}
//                     dataKey="value"
//                     nameKey="name"
//                     innerRadius={50}
//                     outerRadius={90}
//                     label={(entry) => `${entry.name} (${entry.value})`}
//                   >
//                     {publishedVsDraft.map((_, idx) => (
//                       <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Top instructions by views</CardTitle>
//             <CardDescription>Best performing content</CardDescription>
//           </CardHeader>
//           <CardContent>
//             {topByViews.length === 0 ? (
//               <div className="text-sm text-muted-foreground">No top instructions available.</div>
//             ) : (
//               <div style={{ width: '100%', height: 340 }}>
//                 <ResponsiveContainer>
//                   <BarChart data={topByViews}>
//                     <XAxis dataKey="title" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={80} />
//                     <YAxis allowDecimals={false} />
//                     <Tooltip formatter={(value: any) => [value, 'Views']} />
//                     <Bar dataKey="views" fill="#06b6d4">
//                       {topByViews.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
