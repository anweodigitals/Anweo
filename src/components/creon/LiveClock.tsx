import { useEffect, useState } from "react";

export function LiveClock({ tz = "Europe/Berlin", label = "BER" }: { tz?: string; label?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: tz,
      }).format(new Date());
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <span className="font-mono text-xs tracking-widest text-bone/60">
      <span className="text-bone">{label}</span> {time || "--:--:--"}
    </span>
  );
}
