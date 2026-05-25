"use client";

import { useState } from "react";
import ServiceTrackingCard from "./ServiceTrackingCard";
import LiveTrackingDrawer from "./LiveTrackingDrawer";

export default function LiveTrackingSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <ServiceTrackingCard
        workerName="Riya Sharma"
        workerRole="Cleaning Expert"
        rating={4.9}
        reviewCount={236}
        arrivingInMins={6}
        progress={0.38}
        onTrackLive={() => setDrawerOpen(true)}
      />

      <LiveTrackingDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        workerName="Riya Sharma"
        arrivingInMins={6}
      />
    </>
  );
}
