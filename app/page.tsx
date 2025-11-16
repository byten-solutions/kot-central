import { redirect } from "next/navigation";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { isAuthenticated } from "@/lib/auth/utils";
import { COMPANY, ROUTES, STATS, FEATURES } from "@/config/constants";

export default async function Home() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect(ROUTES.dashboard);
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 py-16 md:py-24">
        <Chip color="primary" variant="flat" size="sm">
          {COMPANY.tagline}
        </Chip>
        
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Centralized
            <span className="text-primary"> KOT Management </span>
            for Modern Restaurants
          </h1>
          <p className="text-xl md:text-2xl text-default-600 mb-8 leading-relaxed">
            Streamline operations across all your locations. Real-time order tracking, 
            analytics, and complete control from a single dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={Link}
            color="primary"
            href={ROUTES.login}
            size="lg"
            className="font-semibold"
          >
            Access Dashboard
          </Button>
          <Button
            as={Link}
            href={ROUTES.login}
            size="lg"
            variant="bordered"
            className="font-semibold"
          >
            Request Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-3xl">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{STATS.uptime}</p>
            <p className="text-sm text-default-500 mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{STATS.restaurants}</p>
            <p className="text-sm text-default-500 mt-1">Restaurants</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{STATS.dailyOrders}</p>
            <p className="text-sm text-default-500 mt-1">Daily Orders</p>
          </div>
        </div>
      </section>

      {/* Simple Features Section */}
      <section className="py-16 border-t border-divider">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none bg-default-50/50">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{FEATURES.realTimeMonitoring.title}</h3>
                <p className="text-sm text-default-600">
                  {FEATURES.realTimeMonitoring.description}
                </p>
              </CardBody>
            </Card>

            <Card className="border-none bg-default-50/50">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{FEATURES.multiStore.title}</h3>
                <p className="text-sm text-default-600">
                  {FEATURES.multiStore.description}
                </p>
              </CardBody>
            </Card>

            <Card className="border-none bg-default-50/50">
              <CardBody className="p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{FEATURES.analytics.title}</h3>
                <p className="text-sm text-default-600">
                  {FEATURES.analytics.description}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
