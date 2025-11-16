"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { storeService } from "@/services/store.service";
import { title } from "@/components/primitives";

interface DashboardStats {
  totalStores: number;
  activeStores: number;
  totalOrders: number;
  todayOrders: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await storeService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      <h1 className={title()}>Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-0">
            <h4 className="text-small font-semibold">Total Stores</h4>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold">{stats?.totalStores || 0}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <h4 className="text-small font-semibold">Active Stores</h4>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-success">
              {stats?.activeStores || 0}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <h4 className="text-small font-semibold">Total Orders</h4>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold">{stats?.totalOrders || 0}</p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="pb-0">
            <h4 className="text-small font-semibold">Today's Orders</h4>
          </CardHeader>
          <CardBody>
            <p className="text-4xl font-bold text-primary">
              {stats?.todayOrders || 0}
            </p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </CardHeader>
        <CardBody>
          <p className="text-default-500">
            Activity feed will be displayed here
          </p>
        </CardBody>
      </Card>
    </section>
  );
}
