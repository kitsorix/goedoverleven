import React, { useState } from 'react';
import { Package, Users, Baby, Dog, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function NoodpakketCalculator() {
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [pets, setPets] = useState(0);

    // Constants
    const WATER_PER_PERSON_3_DAYS = 3 * 3; // 3L per day per person for 3 days
    const FOOD_CALS_ADULT = 2000 * 3;
    const FOOD_CALS_CHILD = 1500 * 3;

    const totalPeople = adults + children;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="h-6 w-6 text-orange-600" />
                    Jouw Situatie
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Volwassenen</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                            >-</button>
                            <span className="text-2xl font-bold w-8 text-center">{adults}</span>
                            <button
                                onClick={() => setAdults(adults + 1)}
                                className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center text-xl font-bold transition-colors"
                            >+</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Kinderen</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                            >-</button>
                            <span className="text-2xl font-bold w-8 text-center">{children}</span>
                            <button
                                onClick={() => setChildren(children + 1)}
                                className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center text-xl font-bold transition-colors"
                            >+</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Huisdieren</label>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setPets(Math.max(0, pets - 1))}
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600 transition-colors"
                            >-</button>
                            <span className="text-2xl font-bold w-8 text-center">{pets}</span>
                            <button
                                onClick={() => setPets(pets + 1)}
                                className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 flex items-center justify-center text-xl font-bold transition-colors"
                            >+</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    Jouw Noodpakket Inhoud (72 Uur)
                </h2>

                {/* Basic Needs */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-3 text-lg">Basisbehoeften</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-blue-800">
                            <span className="font-bold">{totalPeople * WATER_PER_PERSON_3_DAYS} Liter</span> drinkwater (3L p.p.p.d)
                        </li>
                        <li className="flex items-center gap-2 text-blue-800">
                            <span className="font-bold">{(adults * FOOD_CALS_ADULT + children * FOOD_CALS_CHILD).toLocaleString()} kCal</span> noodrantsoen (totaal voor 3 dagen)
                        </li>
                        {pets > 0 && (
                            <li className="flex items-center gap-2 text-blue-800">
                                <span className="font-bold">{pets * 3} dagen</span> voer en water voor huisdieren
                            </li>
                        )}
                    </ul>
                </div>

                {/* Equipment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-gray-900 mb-3">Gereedschap & Licht</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />Zaklamp (opwinder of batterijen)</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />Extra batterijen</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />Draagbare radio (AM/FM)</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />Multitool of zakmes</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-orange-500" />Lucifers / Aansteker (waterdicht)</li>
                        </ul>
                    </div>

                    <div className="border p-4 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-gray-900 mb-3">Hygiëne & EHBO</h3>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />EHBO-kit (uitgebreid)</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />Vochtige doekjes / Handgel</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />Toiletpapier</li>
                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />Vuilniszakken</li>
                            {children > 0 && <li className="flex items-start gap-2 font-semibold text-green-700"><div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500" />Luiers / Babyvoeding (indien nodig)</li>}
                        </ul>
                    </div>
                </div>

                {/* Documents & Money */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex gap-3">
                        <AlertTriangle className="text-yellow-600 h-5 w-5 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-yellow-900 mb-1">Documenten & Geld</h3>
                            <p className="text-sm text-yellow-800 mb-2">Bewaar deze in een waterdichte zak.</p>
                            <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                                <li>Kopieën van paspoorten/ID-kaarten</li>
                                <li>Verzekeringspolissen</li>
                                <li>Lijst met noodnummers</li>
                                <li>Contant geld (kleine coupures)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
