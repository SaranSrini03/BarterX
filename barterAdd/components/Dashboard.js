import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";

const Dashboard = () => {
  const router = useRouter(); // Initialize Next.js router
  const products = Array(16).fill(null);

  

  return (
    <div className="p-6 font-mono">
      <div className="mb-10">
        <Card className="flex items-start gap-4 bg-zinc-900 p-4">
          <div className="mt-1 flex-shrink-0">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="text-gray-300">
            Keep Your Dashboard Secure! Unauthorized access can lead to malicious listings
            or unwanted products under your account. Protect your assets—never share your
            credentials!  
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {products.map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2, // Staggered fade-in effect
          }}
        >
          <div className="h-64 bg-zinc-800 hover:bg-zinc-700 transition-colors cursor-pointer rounded-2xl" />
        </motion.div>
      ))}
    </div>
    </div>
  );
};

export default Dashboard;
