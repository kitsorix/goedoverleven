document.addEventListener('DOMContentLoaded', () => {
            const emergencyItems = [
                { id: 1, category: 'Eten & Drinken', name: 'Water', description: 'Zorg voor minimaal 3 liter water per persoon per dag, voor 3 dagen. Dit is voor drinken, eten bereiden en hygiëne.', checked: false, essential: true },
                { id: 2, category: 'Eten & Drinken', name: 'Houdbaar voedsel', description: 'Denk aan ingeblikt voedsel, crackers, energierepen, gedroogd fruit. Genoeg voor 3 dagen. Controleer de houdbaarheidsdatum.', checked: false, essential: true },
                { id: 3, category: 'Veiligheid & Warmte', name: 'EHBO-doos', description: 'Een complete set met pleisters, gaasjes, ontsmettingsmiddel, pijnstillers en eventuele persoonlijke medicijnen.', checked: false, essential: true },
                { id: 4, category: 'Veiligheid & Warmte', name: 'Radio op batterijen of opwindbaar', description: 'Om naar de calamiteitenzender te luisteren voor belangrijke informatie van de overheid. Vergeet extra batterijen niet.', checked: false, essential: true },
                { id: 5, category: 'Veiligheid & Warmte', name: 'Zaklamp', description: 'Een opwindbare zaklamp of een model op batterijen, inclusief extra batterijen. Een hoofdlampje kan ook handig zijn.', checked: false, essential: true },
                { id: 6, category: 'Veiligheid & Warmte', name: 'Dekens of slaapzakken', description: 'Warme dekens of slaapzakken om onderkoeling te voorkomen als de verwarming uitvalt.', checked: false },
                { id: 7, category: 'Hygiëne', name: 'Hygiëneartikelen', description: 'Zeep, desinfecterende handgel, toiletpapier, tandpasta, tandenborstel, maandverband.', checked: false },
                { id: 8, category: 'Gereedschap & Overig', name: 'Lucifers in waterdichte verpakking', description: 'Voor het aansteken van kaarsen of een gaspit.', checked: false, essential: true },
                { id: 9, category: 'Gereedschap & Overig', name: 'Kaarsen of waxinelichtjes', description: 'Zorg voor een stabiele, onbrandbare houder.', checked: false },
                { id: 10, category: 'Gereedschap & Overig', name: 'Contant geld', description: 'Pinautomaten werken mogelijk niet bij een stroomstoring.', checked: false },
                { id: 11, category: 'Gereedschap & Overig', name: 'Kopieën van belangrijke documenten', description: 'Paspoorten, verzekeringspapieren, diploma\'s. Bewaar ze waterdicht of sla ze online op.', checked: false },
                { id: 12, category: 'Gereedschap & Overig', name: 'Gereedschapsset', description: 'Een multitool of basisgereedschap kan van pas komen.', checked: false },
                { id: 13, category: 'Gereedschap & Overig', name: 'Powerbank', description: 'Een opgeladen powerbank om je telefoon of andere kleine apparaten van stroom te voorzien.', checked: false},
                { id: 14, category: 'Specifiek', name: 'Voeding voor baby, kind of huisdier', description: 'Specifieke voeding, medicatie of andere benodigdheden voor gezinsleden of huisdieren.', checked: false },
            ];
            
            let chartInstance = null;
            const checklistContainer = document.getElementById('checklist-container');
            const itemsCheckedEl = document.getElementById('items-checked');
            const itemsTotalEl = document.getElementById('items-total');
            const modal = document.getElementById('item-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const modalClose = document.getElementById('modal-close');
            const printButton = document.getElementById('print-button');
            const printContent = document.getElementById('print-content');

            function getCategories() {
                return [...new Set(emergencyItems.map(item => item.category))];
            }

            function renderChecklist() {
                const categories = getCategories();
                let html = '';
                categories.forEach(category => {
                    html += `<div class="mb-8">`;
                    html += `<h2 class="text-2xl font-bold text-gray-800 border-b-2 border-red-200 pb-2 mb-4">${category}</h2>`;
                    if (category === 'Eten & Drinken') {
                        html += `<p class="text-gray-600 mb-4">Voor 72 uur zelfredzaamheid zijn voedsel en water van levensbelang. Zorg dat u genoeg heeft voor iedereen in huis, inclusief huisdieren, en kies voor houdbare producten die geen kookapparatuur nodig hebben.</p>`;
                    } else if (category === 'Veiligheid & Warmte') {
                        html += `<p class="text-gray-600 mb-4">Bij een stroomstoring of evacuatie is het cruciaal dat u veilig en warm blijft. Denk aan communicatiemiddelen, verlichting en warme dekens om uzelf te beschermen.</p>`;
                    } else if (category === 'Hygiëne') {
                        html += `<p class="text-gray-600 mb-4">Hygiëne is essentieel om ziekte te voorkomen. Zorg voor basisartikelen om uzelf schoon te houden, zelfs zonder stromend water.</p>`;
                    } else if (category === 'Gereedschap & Overig') {
                        html += `<p class="text-gray-600 mb-4">Deze categorie bevat items die u helpen bij praktische problemen, van het vinden van uw weg in het donker tot het regelen van betalingen.</p>`;
                    } else if (category === 'Specifiek') {
                        html += `<p class="text-gray-600 mb-4">Vergeet niet om specifieke benodigdheden voor kwetsbare groepen in uw huishouden toe te voegen, zoals baby's, kinderen, ouderen of huisdieren.</p>`;
                    }
                    html += `<ul class="space-y-3">`;
                    emergencyItems.filter(item => item.category === category).forEach(item => {
                        html += `
                            <li class="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                <div class="flex items-center">
                                    <input type="checkbox" id="item-${item.id}" data-id="${item.id}" class="h-6 w-6 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer" ${item.checked ? 'checked' : ''}>
                                    <label for="item-${item.id}" class="ml-4 text-lg text-gray-700 cursor-pointer">${item.name}</label>
                                    ${item.essential ? '<span class="ml-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">Essentieel</span>' : ''}
                                </div>
                                <button data-id="${item.id}" class="info-button text-gray-400 hover:text-red-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </button>
                            </li>`;
                    });
                    html += `</ul></div>`;
                });
                checklistContainer.innerHTML += html;
                addEventListeners();
            }

            function updateSummaryAndChart() {
                const checkedCount = emergencyItems.filter(item => item.checked).length;
                const totalCount = emergencyItems.length;
                itemsCheckedEl.textContent = checkedCount;
                itemsTotalEl.textContent = totalCount;

                const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
                
                if (chartInstance) {
                    chartInstance.data.datasets[0].data = [progress, 100 - progress];
                    chartInstance.update();
                }
            }

            function initializeChart() {
                const ctx = document.getElementById('progressChart').getContext('2d');
                chartInstance = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [0, 100],
                            backgroundColor: ['#A32A29', '#fde8e8'],
                            borderColor: ['#A32A29', '#fde8e8'],
                            borderWidth: 1,
                            circumference: 180,
                            rotation: 270,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '75%',
                        plugins: {
                            tooltip: { enabled: false },
                            legend: { display: false }
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        }
                    },
                    plugins: [{
                        id: 'doughnutText',
                        afterDraw(chart) {
                            const {ctx, width, height} = chart;
                            ctx.restore();
                            const fontSize = (height / 114).toFixed(2);
                            ctx.font = `bold ${fontSize}em system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
                            ctx.textBaseline = 'middle';
                            
                            const text = Math.round(chart.data.datasets[0].data[0]) + '%';
                            const textX = Math.round((width - ctx.measureText(text).width) / 2);
                            const textY = height / 1.5;

                            ctx.fillStyle = '#333';
                            ctx.fillText(text, textX, textY);
                            ctx.save();
                        }
                    }]
                });
            }

            function handleCheckboxChange(e) {
                const itemId = parseInt(e.target.dataset.id);
                const item = emergencyItems.find(i => i.id === itemId);
                if (item) {
                    item.checked = e.target.checked;
                    updateSummaryAndChart();
                }
            }
            
            function showModal(itemId) {
                const item = emergencyItems.find(i => i.id === itemId);
                if (item) {
                    modalTitle.textContent = item.name;
                    modalDescription.textContent = item.description;
                    modal.classList.remove('hidden');
                    setTimeout(() => {
                        modal.classList.remove('opacity-0');
                        modal.querySelector('div').classList.remove('scale-95');
                    }, 10);
                }
            }

            function hideModal() {
                modal.classList.add('opacity-0');
                modal.querySelector('div').classList.add('scale-95');
                setTimeout(() => {
                     modal.classList.add('hidden');
                }, 300);
            }

            function handlePrint() {
                const categories = getCategories();
                let printHtml = `<h1 style="font-size: 2rem; font-weight: bold; color: black; text-align: center; margin-bottom: 2rem;">Mijn Noodpakket Checklist</h1>`;
                categories.forEach(category => {
                    printHtml += `<h2 style="font-size: 1.5rem; font-weight: bold; color: black; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; margin-top: 1.5rem; margin-bottom: 1rem;">${category}</h2>`;
                    emergencyItems.filter(item => item.category === category).forEach(item => {
                        printHtml += `<li style="font-size: 1.1rem; margin-bottom: 0.5rem; display: flex; align-items: center;">
                            <span style="display: inline-block; width: 24px; height: 24px; border: 1px solid #333; margin-right: 12px; text-align: center; line-height: 24px;">${item.checked ? '✔' : '&nbsp;'}</span>
                            ${item.name}
                        </li>`;
                    });
                    printHtml += `</ul>`;
                });
                printContent.innerHTML = printHtml;
                // Dit zorgt voor een kleine vertraging, zodat de browser de DOM-update kan verwerken
                // voordat het printvenster wordt geopend.
                setTimeout(() => window.print(), 100);
            }

            function addEventListeners() {
                document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                    checkbox.addEventListener('change', handleCheckboxChange);
                });
                document.querySelectorAll('.info-button').forEach(button => {
                    button.addEventListener('click', (e) => showModal(parseInt(e.currentTarget.dataset.id)));
                });
            }
            
            modalClose.addEventListener('click', hideModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal();
                }
            });
            printButton.addEventListener('click', handlePrint);

            renderChecklist();
            initializeChart();
            updateSummaryAndChart();
        });