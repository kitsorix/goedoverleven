import React, { useState } from 'react';
import { Droplets, User, Utensils, Bath, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function WaterCalculator() {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);
    const [days, setDays] = useState(14); // Standard recommendation
    const [showDetails, setShowDetails] = useState(false);

    // Guidelines per person per day (minimal survival)
    const DRINKING_ADULTS = 3;
    const DRINKING_CHILDREN = 2; // Average
    const HYGIENE_BASIC = 2;
    const COOKING = 1;

    // Calculcations
    const dailyDrinking = (adults * DRINKING_ADULTS) + (children * DRINKING_CHILDREN);
    const dailyHygiene = (adults + children) * HYGIENE_BASIC;
    const dailyCooking = (adults + children) * COOKING;

    const dailyTotal = dailyDrinking + dailyHygiene + dailyCooking;
    const totalWater = dailyTotal * days;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <Droplets className="h-6 w-6 text-blue-500" />
                    Water Calculator
                </h2>
                <p className="text-gray-600 mb-6 text-sm">Bereken hoeveel water je moet opslaan voor noodsituaties.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Aantal Volwassenen</label>
                        <input
                            type="number"
                            min="1"
                            value={adults}
                            onChange={(e) => setAdults(parseInt(e.target.value) || 0)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Aantal Kinderen</label>
                        <input
                            type="number"
                            min="0"
                            value={children}
                            onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Dagen Voorraad</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        />
                        <p className="text-xs text-gray-500">Aanbevolen: min. 3 dagen, beter 14 dagen.</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Totaal Benodigd Water</h3>
                <p className="text-5xl font-bold text-blue-600 mb-2">{totalWater} Liter</p>
                <p className="text-blue-800 text-sm">
                    Voor {adults + children} personen gedurende {days} dagen.
                </p>
            </div>

            <div className="mt-6">
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-between w-full text-left text-gray-700 font-medium hover:text-blue-600 focus:outline-none transition-colors"
                >
                    <span>Bekijk specificatie per dag</span>
                    {showDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>

                {showDetails && (
                    <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <User className="h-4 w-4 text-blue-500" />
                                <span>Drinken</span>
                            </div>
                            <span className="font-bold text-gray-900">{dailyDrinking} L / dag</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Utensils className="h-4 w-4 text-orange-500" />
                                <span>Koken & Bereiden</span>
                            </div>
                            <span className="font-bold text-gray-900">{dailyCooking} L / dag</span>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Bath className="h-4 w-4 text-teal-500" />
                                <span>Minimale Hygiëne</span>
                            </div>
                            <span className="font-bold text-gray-900">{dailyHygiene} L / dag</span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <span className="font-bold text-gray-900">Totaal per dag</span>
                            <span className="font-bold text-blue-600">{dailyTotal} L</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" /> Opslag Tip
                    </h4>
                    <p className="text-sm text-green-800">
                        Gebruik jerrycans van 10 of 20 liter. Deze zijn nog tilbaar. {Math.ceil(totalWater / 20)} jerrycans van 20L nodig.
                    </p>
                </div>
            </div>
        </div>
    );
}
