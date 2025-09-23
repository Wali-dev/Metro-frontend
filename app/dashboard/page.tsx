// app/dashboard/page.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/services/api';
import type { Instruction, InstructionResponse } from '@/app/interfaces/interfaces';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { IconPlus, IconListDetails, IconSearch } from '@tabler/icons-react';

const USER_ID = '68b31beb50e1757d8ddddb5b'; // replace with real auth id

export default function DashboardPage() {
  const router = useRouter();
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getInstructionsByUser(USER_ID) as InstructionResponse;
        const items = res.instructions;
        if (mounted) setInstructions(items);
      } catch (err: unknown) {
        console.error('Failed to fetch instructions:', err);
        const message = err instanceof Error ? err.message : 'Failed to load';
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(() => {
    const total = instructions.length;
    const published = instructions.filter((i) => i.is_published).length;
    const drafts = total - published;
    const lastUpdated = instructions
      .slice()
      .sort((a, b) => (new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime()));
    return { total, published, drafts, lastUpdated };
  }, [instructions]);

  const recent = useMemo(() => {
    if (!instructions || instructions.length === 0) return [];
    const filtered = instructions
      .filter((i) => {
        if (!query) return true;
        const q = query.trim().toLowerCase();
        return (
          i.title?.toLowerCase().includes(q) ||
          i.description?.toLowerCase().includes(q)
        );
      })
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
          new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
      );
    return filtered.slice(0, 5);
  }, [instructions, query]);

  function goToCreate() {
    router.push('/dashboard/instructions/new');
  }

  function goToAll() {
    router.push('/dashboard/instructions');
  }

  function openInstruction(item: Instruction) {
    // navigate to detail page and include item as encoded param if you like
    router.push(`/dashboard/instructions/${item._id}?data=${encodeURIComponent(JSON.stringify(item))}`);
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview & quick actions</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={goToCreate} variant="default">
            <IconPlus className="mr-1 h-4 w-4" />
            Create Instruction
          </Button>
          <Button onClick={goToAll} variant="outline">
            <IconListDetails className="mr-2 h-4 w-4" />
            View All
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-md">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            placeholder="Search instructions..."
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '-' : stats.total}</div>
            <div className="mt-2 text-sm text-muted-foreground">All instructions you created</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '-' : stats.published}</div>
            <div className="mt-2 text-sm text-muted-foreground">Live instructions</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{loading ? '-' : stats.drafts}</div>
            <div className="mt-2 text-sm text-muted-foreground">Not published yet</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent instructions</h2>
          <div className="text-sm text-muted-foreground">{loading ? '' : `${instructions.length} total`}</div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 border rounded-md animate-pulse bg-card h-28" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : recent.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground border rounded">No instructions found — create one to get started.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recent.map((item) => (
              <Card key={item._id} className="cursor-pointer hover:shadow-md" onClick={() => openInstruction(item)}>
                <CardContent>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground">Updated {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '—'}</div>
                      <div className="font-semibold ">{item.title || 'Untitled'}</div>
                      <div className="mt-2 text-sm text-muted-foreground line-clamp-3">{item.description || ''}</div>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Badge variant="outline" className={item.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                        {item.is_published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
