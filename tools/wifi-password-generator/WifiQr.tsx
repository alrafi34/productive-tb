"use client";

import { useEffect, useState } from "react";

/* Characters with a special meaning in a WIFI: QR payload are escaped with a backslash. */
export function escapeWifiField(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

/* The payload phones read when joining a network from a QR code. */
export function wifiQrPayload(ssid: string, password: string, security: "WPA" | "nopass", hidden: boolean): string {
  const pass = security === "nopass" ? "" : `P:${escapeWifiField(password)};`;
  return `WIFI:T:${security};S:${escapeWifiField(ssid)};${pass}${hidden ? "H:true;" : ""};`;
}

/* A scannable "join this network" QR code for the generated password. */
export default function WifiQr({ password }: { password: string }) {
  const [ssid, setSsid] = useState("");
  const [hidden, setHidden] = useState(false);
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!ssid.trim() || !password) {
      setDataUrl("");
      return;
    }
    // Loaded on demand so the QR library is not in the page's first load
    import("qrcode").then(({ default: QRCode }) =>
      QRCode.toDataURL(wifiQrPayload(ssid, password, "WPA", hidden), { width: 240, margin: 2, errorCorrectionLevel: "M" })
    ).then((url) => {
      if (!cancelled) setDataUrl(url);
    }).catch(() => {
      if (!cancelled) setDataUrl("");
    });
    return () => {
      cancelled = true;
    };
  }, [ssid, password, hidden]);

  return (
    <div className="mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Share as a WiFi QR code</h3>
      <p className="text-xs text-gray-500 mb-3">
        Enter your network name: guests scan the code with their phone camera to join without typing the password.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1 w-full space-y-2">
          <label htmlFor="wifi-ssid" className="block text-xs font-medium text-gray-700">Network name (SSID)</label>
          <input
            id="wifi-ssid"
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="e.g. HomeWiFi"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="rounded border-gray-300" />
            Hidden network
          </label>
          <p className="text-[11px] text-gray-500">Security: WPA/WPA2/WPA3. The code is made in your browser; nothing is uploaded.</p>
        </div>
        {dataUrl && (
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dataUrl} alt={`QR code to join ${ssid}`} width={160} height={160} className="rounded-lg border border-gray-200 bg-white" />
            <a
              href={dataUrl}
              download={`wifi-${ssid.replace(/[^\w-]+/g, "_") || "network"}.png`}
              className="mt-2 inline-block text-xs font-semibold text-primary hover:underline"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
