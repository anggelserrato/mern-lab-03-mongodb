import { useEffect, useState } from "react";

export default function DbStatus() {
  const [isConnected, setIsConnected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("http://localhost:3000/health");
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 5000); // Verificar cada 5s
    return () => clearInterval(interval);
  }, []);

  const statusColor = isConnected ? "bg-green-500" : "bg-red-500";
  const statusLabel = isConnected ? "Connected" : "Disconnected";

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${statusColor}`} />
      <span className="text-sm text-gray-600">{statusLabel}</span>
    </div>
  );
}
