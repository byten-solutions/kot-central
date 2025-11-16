"use client";

import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { Chip } from "@heroui/chip";
import { storeService, Store } from "@/services/store.service";
import { title } from "@/components/primitives";

export default function StoresPage() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const data = await storeService.getAllStores();
      setStores(data);
    } catch (error) {
      console.error("Failed to load stores:", error);
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
      <div className="flex justify-between items-center">
        <h1 className={title()}>Stores</h1>
        <Button color="primary">Add New Store</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.map((store) => (
          <Card key={store.id}>
            <CardBody className="gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{store.name}</h3>
                  <p className="text-small text-default-500">
                    {store.location}
                  </p>
                </div>
                <Chip
                  color={store.status === "active" ? "success" : "default"}
                  size="sm"
                  variant="flat"
                >
                  {store.status}
                </Chip>
              </div>
              <div className="flex gap-4 text-small">
                <div>
                  <p className="text-default-500">Orders Today</p>
                  <p className="font-semibold">{store.ordersToday}</p>
                </div>
                <div>
                  <p className="text-default-500">Total Orders</p>
                  <p className="font-semibold">{store.totalOrders}</p>
                </div>
              </div>
              <Button size="sm" variant="flat">
                View Details
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
