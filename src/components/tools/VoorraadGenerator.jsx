import React, { useState } from 'react';
import { ShoppingCart, Calendar, Users, Check, Printer, Download } from 'lucide-react';

export default function VoorraadGenerator() {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [weeks, setWeeks] = useState(2);
    const [generated, setGenerated] = useState(false);

    // Constants
    const DAYS_PER_WEEK = 7;
    const ADULT_CAL_TARGET = 2200;
    const CHILD_CAL_TARGET = 1600;

    // Categories
    const CATEGORIES = {
        carbs: {
            name: 'Koolhydraten (Basis)',
            items: [
                { name: 'Rijst (droog)', calsPerKg: 3600, share: 0.3 }, // 30% of cals
                { name: 'Pasta (droog)', calsPerKg: 3500, share: 0.3 },
                { name: 'Havermout', calsPerKg: 3800, share: 0.1 },
                { name: 'Aardappelpuree (poeder)', calsPerKg: 3500, share: 0.1 }
            ]
        },
        protein: {
            name: 'Eiwitten & Blikvoer',
            items: [
                { name: 'Bonen/Linzen (blik)', calsPerKg: 800, share: 0.15 },
                { name: 'Vlees/Vis (blik)', calsPerKg: 1500, share: 0.15 },
                { name: 'Pindakaas', calsPerKg: 6000, share: 0.05 }
            ]
        },
        veg: {
            name: 'Groenten & Fruit (Blik/Pot)',
            items: [
                { name: 'Groentenmix', calsPerKg: 400, share: 0.1 },
                { name: 'Fruit in blik', calsPerKg: 600, share: 0.05 },
                { name: 'Pastasaus', calsPerKg: 500, share: 0.05 }
            ]
        },
        extras: {
            name: 'Smaakmakers & Extra\'s',
            items: [
                { name: 'Olie / Vet', calsPerKg: 8800, share: 0.1 }, // Critical for calories
                { name: 'Suiker / Honing', calsPerKg: 4000, share: 0.05 },
                { name: 'Zout (kg)', fixed: 0.2 }, // Fixed per month approx
                { name: 'Kruidenmix', fixed: 0.1 }
            ]
        }
    };

    const calculateList = () => {
        const totalDailyCals = (adults * ADULT_CAL_TARGET) + (children * CHILD_CAL_TARGET);
        const totalCals = totalDailyCals * weeks * DAYS_PER_WEEK;

        const list = {};

        Object.entries(CATEGORIES).forEach(([key, cat]) => {
            list[key] = { name: cat.name, items: [] };
            cat.items.forEach(item => {
                let amount = 0;
                if (item.fixed) {
                    // Fixed amount per month-ish scaled by people
                    amount = item.fixed * (weeks / 4) * ((adults + children) / 3);
                } else {
                    const itemTotalCals = totalCals * item.share;
                    amount = itemTotalCals / item.calsPerKg;
                }
                list[key].items.push({ name: item.name, amount: Math.ceil(amount * 10) / 10, unit: 'kg' });
            });
        });

        return list;
    };

    const shoppingList = generated ? calculateList() : null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-8 border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-green-900 mb-4 flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                    Voorraad Generator
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Volwassenen</label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                            <Users className="h-4 w-4 text-gray-500" />
                            <input type="number" min="1" value={adults} onChange={e => setAdults(Math.max(1, parseInt(e.target.value)))} className="bg-transparent w-full outline-none font-bold text-gray-900" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Kinderen</label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                            <Users className="h-4 w-4 text-gray-500" />
                            <input type="number" min="0" value={children} onChange={e => setChildren(Math.max(0, parseInt(e.target.value)))} className="bg-transparent w-full outline-none font-bold text-gray-900" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Periode (Weken)</label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <input type="number" min="1" max="52" value={weeks} onChange={e => setWeeks(Math.max(1, parseInt(e.target.value)))} className="bg-transparent w-full outline-none font-bold text-gray-900" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setGenerated(true)}
                    className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                    <Check className="h-5 w-5" /> Genereer Boodschappenlijst
                </button>
            </div>

            {shoppingList && (
                <div className="animate-fadeIn">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Jouw Boodschappenlijst</h3>
                        <button title="Printen" onClick={() => window.print()} className="text-gray-500 hover:text-green-700 transition">
                            <Printer className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(shoppingList).map(([key, cat]) => (
                            <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <h4 className="font-bold text-green-800 border-b border-gray-200 pb-2 mb-3 uppercase text-xs tracking-wider">{cat.name}</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {cat.items.map((item, idx) => (
                                        <li key={idx} className="flex justify-between text-sm text-gray-700">
                                            <span>{item.name}</span>
                                            <span className="font-bold">{item.amount > 0 ? item.amount : '< 0.1'} {item.unit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <p className="mt-8 text-xs text-gray-500 text-center italic">
                        * Dit is een schatting gebaseerd op {ADULT_CAL_TARGET} kcal/dag voor volwassenen en {CHILD_CAL_TARGET} kcal/dag voor kinderen.
                        De verdeling zorgt voor een basisvoeding. Vul aan met vitamines en variatie.
                    </p>
                </div>
            )}
        </div>
    );
}
