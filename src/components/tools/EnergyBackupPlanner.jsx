import React, { useState } from 'react';
import { Zap, Battery, Sun, Plus, X } from 'lucide-react';

const DEVICES = [
    { id: 'phone', label: 'Smartphone (opladen)', watts: 15, defaultHours: 2 },
    { id: 'laptop', label: 'Laptop (werken)', watts: 65, defaultHours: 4 },
    { id: 'router', label: 'WiFi Modem / Router', watts: 12, defaultHours: 24 },
    { id: 'led', label: 'LED Lamp', watts: 10, defaultHours: 6 },
    { id: 'fridge', label: 'Koelkast (energiezuinig)', watts: 100, defaultHours: 8 }, // Duty cycle approx 1/3 but simpler to user avg watts
    { id: 'freezer', label: 'Vriezer', watts: 150, defaultHours: 8 },
    { id: 'fan', label: 'Ventilator', watts: 40, defaultHours: 8 },
    { id: 'radio', label: 'Noodradio', watts: 5, defaultHours: 12 },
];

export default function EnergyBackupPlanner() {
    const [selectedDevices, setSelectedDevices] = useState([{ ...DEVICES[0], hours: DEVICES[0].defaultHours }]);
    const [days, setDays] = useState(1);

    const addDevice = (deviceId) => {
        const device = DEVICES.find(d => d.id === deviceId);
        if (device) {
            setSelectedDevices([...selectedDevices, { ...device, hours: device.defaultHours }]);
        }
    };

    const removeDevice = (index) => {
        const newDevices = [...selectedDevices];
        newDevices.splice(index, 1);
        setSelectedDevices(newDevices);
    };

    const updateHours = (index, hours) => {
        const newDevices = [...selectedDevices];
        newDevices[index].hours = Math.max(0, parseFloat(hours) || 0);
        setSelectedDevices(newDevices);
    };

    const totalWh = selectedDevices.reduce((sum, device) => sum + (device.watts * device.hours), 0) * days;
    const recommendedBatteryWh = totalWh * 1.2; // 20% inefficiency buffer

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-900 mb-2 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-yellow-500" />
                    Stroomverbruik Calculator
                </h2>
                <p className="text-gray-600 mb-6">Selecteer je apparaten om te zien wat voor powerstation of accu je nodig hebt.</p>

                <div className="flex gap-2 mb-4 flex-wrap">
                    {DEVICES.map(device => (
                        <button
                            key={device.id}
                            onClick={() => addDevice(device.id)}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-800 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                        >
                            <Plus className="h-3 w-3" /> {device.label}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 mb-6">
                    {selectedDevices.map((device, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex-1">
                                <span className="font-medium text-gray-900">{device.label}</span>
                                <span className="text-xs text-gray-500 block">{device.watts} Watt</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex flex-col items-end">
                                    <label className="text-xs text-gray-500">Uren/dag</label>
                                    <input
                                        type="number"
                                        min="0" max="24"
                                        value={device.hours}
                                        onChange={(e) => updateHours(idx, e.target.value)}
                                        className="w-16 p-1 text-right border rounded border-gray-300"
                                    />
                                </div>
                                <button onClick={() => removeDevice(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {selectedDevices.length === 0 && <p className="text-gray-400 italic text-center py-4">Geen apparaten geselecteerd</p>}
                </div>

                <div className="flex items-center gap-2 mb-6 justify-end">
                    <span className="text-gray-700 font-medium">Aantal dagen autonomie:</span>
                    <input
                        type="number" min="1" max="14"
                        value={days}
                        onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                        className="w-20 p-2 border rounded border-gray-300 font-bold"
                    />
                </div>

            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                        <p className="text-yellow-100 text-sm font-medium uppercase tracking-wider mb-1">Dagelijks Verbruik</p>
                        <p className="text-3xl font-extrabold">{(totalWh / days).toFixed(0)} Wh</p>
                    </div>
                    <div>
                        <p className="text-yellow-100 text-sm font-medium uppercase tracking-wider mb-1">Totale Behoefte</p>
                        <p className="text-3xl font-extrabold">{totalWh.toFixed(0)} Wh</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Battery className="h-5 w-5 text-green-600" />
                    Aanbevolen Powerstation
                </h3>
                <p className="text-gray-700 mb-4">
                    Zoek een powerstation met minimaal <span className="font-bold text-green-700">{recommendedBatteryWh.toFixed(0)}Wh</span> capaciteit.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Simple logic for recommendation */}
                    {recommendedBatteryWh < 256 && (
                        <div className="p-4 border rounded-lg bg-gray-50 hover:border-green-400 transition-colors">
                            <span className="text-xs font-bold text-gray-500 uppercase">Instap Model</span>
                            <h4 className="font-bold text-gray-900">Portable Power Station (256Wh)</h4>
                            <p className="text-xs text-gray-600">Bijv. EcoFlow River 2 / Jackery 300</p>
                        </div>
                    )}
                    {recommendedBatteryWh >= 256 && recommendedBatteryWh < 700 && (
                        <div className="p-4 border rounded-lg bg-gray-50 hover:border-green-400 transition-colors">
                            <span className="text-xs font-bold text-gray-500 uppercase">Middenklasse</span>
                            <h4 className="font-bold text-gray-900">Power Station (500-750Wh)</h4>
                            <p className="text-xs text-gray-600">Bijv. EcoFlow River 2 Pro / Bluetti EB70</p>
                        </div>
                    )}
                    {recommendedBatteryWh >= 700 && recommendedBatteryWh < 2000 && (
                        <div className="p-4 border rounded-lg bg-gray-50 hover:border-green-400 transition-colors">
                            <span className="text-xs font-bold text-gray-500 uppercase">Zwaar Gebruik</span>
                            <h4 className="font-bold text-gray-900">Solar Generator (1000-2000Wh)</h4>
                            <p className="text-xs text-gray-600">Bijv. EcoFlow Delta 2 / Jackery 1500</p>
                        </div>
                    )}
                    {recommendedBatteryWh >= 2000 && (
                        <div className="p-4 border rounded-lg bg-gray-50 hover:border-red-400 transition-colors border-red-200 bg-red-50">
                            <span className="text-xs font-bold text-red-500 uppercase">Extreem Zwaar</span>
                            <h4 className="font-bold text-red-900">Thuisbatterij (2kWh+)</h4>
                            <p className="text-xs text-red-700">Overweeg aggregaten of vaste installaties.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
