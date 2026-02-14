import React, { useState } from 'react';
import { ClipboardList, CheckSquare, Square, Printer, AlertTriangle } from 'lucide-react';

const SCENARIOS = [
    {
        id: 'power',
        label: 'Stroomuitval (Langdurig)',
        items: [
            'Zaklampen (per persoon + reserve)',
            'Batterijen (genoeg voor 72u)',
            'Powerbank (volgeladen)',
            'Cash geld (kleine coupures)',
            'Radio op batterijen/opwindbaar',
            'Kaarsen & Lucifers (veilig gebruik!)',
            'Warme dekens / slaapzakken',
            'Campinggasstel + gastankjes'
        ]
    },
    {
        id: 'water',
        label: 'Watertekort / Vervuiling',
        items: [
            'Waterfilter (Lifestraw/Sawyer)',
            'Waterzuiveringstabletten (Hadex)',
            'Jerrycans met drinkwater (3L p.p.p.d.)',
            'Vochtige doekjes (hygiëne)',
            'Wegwerpservies (bespaart afwaswater)'
        ]
    },
    {
        id: 'flood',
        label: 'Overstroming / Evacuatie',
        items: [
            'Bug Out Bag (Noodrugzak) klaarzetten',
            'Waterdichte kleding & laarzen',
            'Belangrijke documenten in waterdichte hoes',
            'Kopie van huissleutels',
            'Kaart van de omgeving (offline)',
            'Noodplan met vluchtroutes besproken'
        ]
    },
    {
        id: 'medical',
        label: 'Medische Noodsituatie / Pandemie',
        items: [
            'EHBO-doos (uitgebreid)',
            'Mondmaskers (FFP2/FFP3)',
            'Desinfectiemiddel',
            'Thermometer',
            'Paracetamol / Ibuprofen',
            'Persoonlijke medicatie (extra voorraad)'
        ]
    }
];

export default function CrisisChecklistBuilder() {
    const [selectedScenarios, setSelectedScenarios] = useState(['power']);
    const [customItems, setCustomItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const toggleScenario = (id) => {
        if (selectedScenarios.includes(id)) {
            setSelectedScenarios(selectedScenarios.filter(s => s !== id));
        } else {
            setSelectedScenarios([...selectedScenarios, id]);
        }
    };

    const addCustomItem = (e) => {
        e.preventDefault();
        if (newItem.trim()) {
            setCustomItems([...customItems, newItem.trim()]);
            setNewItem('');
        }
    };

    const removeCustomItem = (index) => {
        const newItems = [...customItems];
        newItems.splice(index, 1);
        setCustomItems(newItems);
    };

    const allSelectedItems = SCENARIOS
        .filter(s => selectedScenarios.includes(s.id))
        .flatMap(s => s.items);

    // De-duplicate items would be nice but straightforward mapping for now

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <ClipboardList className="h-6 w-6 text-red-600" />
                    Crisis Checklist Builder
                </h2>
                <p className="text-gray-600 mb-6">Selecteer de scenario's waarvoor je wilt voorbereiden en krijg een op maat gemaakte checklist.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {SCENARIOS.map(scenario => (
                        <button
                            key={scenario.id}
                            onClick={() => toggleScenario(scenario.id)}
                            className={`text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3
                        ${selectedScenarios.includes(scenario.id)
                                    ? 'border-red-500 bg-red-50 text-red-900'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-red-200'}`}
                        >
                            <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center 
                         ${selectedScenarios.includes(scenario.id) ? 'bg-red-500 border-red-500' : 'border-gray-400'}`}>
                                {selectedScenarios.includes(scenario.id) && <CheckSquare className="text-white h-3 w-3" />}
                            </div>
                            <span className="font-medium">{scenario.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 print:bg-white print:border-none">
                <div className="flex justify-between items-center mb-6 print:hidden">
                    <h3 className="text-xl font-bold text-gray-900">Jouw Persoonlijke Checklist</h3>
                    <button onClick={() => window.print()} className="flex items-center gap-2 text-gray-600 hover:text-red-700 font-medium">
                        <Printer className="h-5 w-5" /> Printen
                    </button>
                </div>

                {selectedScenarios.length === 0 ? (
                    <p className="text-gray-500 italic text-center py-8">Selecteer ten minste één scenario hierboven.</p>
                ) : (
                    <div className="space-y-6">
                        {SCENARIOS.filter(s => selectedScenarios.includes(s.id)).map(scenario => (
                            <div key={scenario.id} className="mb-4 break-inside-avoid">
                                <h4 className="font-bold text-red-800 border-b border-red-100 pb-1 mb-3 uppercase text-sm tracking-wider flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" /> {scenario.label}
                                </h4>
                                <ul className="space-y-2">
                                    {scenario.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-800">
                                            <Square className="h-5 w-5 text-gray-300 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {customItems.length > 0 && (
                            <div className="mb-4 break-inside-avoid">
                                <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-3 uppercase text-sm tracking-wider">
                                    Eigen Toevoegingen
                                </h4>
                                <ul className="space-y-2">
                                    {customItems.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-gray-800 group">
                                            <Square className="h-5 w-5 text-gray-300 flex-shrink-0" />
                                            <span className="flex-1">{item}</span>
                                            <button onClick={() => removeCustomItem(idx)} className="text-red-400 hover:text-red-600 print:hidden opacity-0 group-hover:opacity-100 transition-opacity text-xs">Verwijder</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8 border-t border-gray-200 pt-4 print:hidden">
                    <form onSubmit={addCustomItem} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Voeg eigen item toe..."
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            className="flex-1 border-gray-300 rounded-md shadow-sm p-2 border focus:ring-red-500 focus:border-red-500"
                        />
                        <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md font-medium transition-colors">
                            Toevoegen
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
