// script.js

// Función simulada para llamar a la API de Gemini
// En una aplicación real, este endpoint sería un backend que oculta tu API Key
// y se comunica de forma segura con la API de Gemini.
async function callGeminiAPI(prompt) {
    // SIMULACIÓN: En un entorno real, harías un fetch a tu propio backend:
    // const response = await fetch('/api/gemini-pro', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt: prompt })
    // });
    // const data = await response.json();
    // return data.response; 

    // Para esta demo de frontend, devolvemos un texto simulado
    console.log("Simulando llamada a Gemini con el prompt:", prompt);
    const simulatedResponses = {
        "crisis": "La Crisis del Antiguo Régimen (1808-1833) en España fue un período convulso iniciado por la Guerra de la Independencia contra la invasión napoleónica. Tras la promulgación de la Constitución de Cádiz (1812), Fernando VII restauró el absolutismo. Se vivió un breve Trienio Liberal (1820-1823) y la posterior Década Ominosa (1823-1833), que culminó con una crisis sucesoria.",
        "isabel-ii": "El reinado de Isabel II (1833-1868) se caracterizó por la consolidación del Estado Liberal. Sin embargo, hubo una intensa lucha entre moderados y progresistas, lo que llevó a varias constituciones y cambios de gobierno. La Primera Guerra Carlista (1833-1840) fue clave para afianzar el trono de la reina, pero el descontento creciente llevaría a su derrocamiento.",
        "sexenio": "El Sexenio Democrático (1868-1874) fue un intento de establecer una monarquía democrática y, por primera vez, una república en España. Tras la 'Revolución Gloriosa' que expulsó a Isabel II, se promulgó la avanzada Constitución de 1869. Sin embargo, la inestabilidad política, las guerras carlistas y el cantonalismo hicieron fracasar tanto el reinado de Amadeo I como la Primera República.",
        "restauracion": "La Restauración Borbónica (1874-1900) supuso la vuelta de Alfonso XII al trono, impulsada por Cánovas del Castillo. Se estableció un sistema de estabilidad basado en el 'turno pacífico' de partidos (Conservador y Liberal) y el caciquismo, que garantizaba la alternancia en el poder. Este periodo, aunque estable, terminó en crisis con la derrota en la Guerra de Cuba y el 'Desastre del 98'.",
        "default": "Disculpa, no puedo responder esa pregunta en este momento, o la pregunta está fuera de mi alcance."
    };

    return new Promise(resolve => {
        setTimeout(() => {
            if (prompt.includes("Crisis del Antiguo Régimen")) {
                resolve(simulatedResponses["crisis"]);
            } else if (prompt.includes("Reinado de Isabel II")) {
                resolve(simulatedResponses["isabel-ii"]);
            } else if (prompt.includes("Sexenio Democrático")) {
                resolve(simulatedResponses["sexenio"]);
            } else if (prompt.includes("Restauración Borbónica")) {
                resolve(simulatedResponses["restauracion"]);
            } else if (prompt.startsWith("Pregunta sobre la historia del siglo XIX en España:")) {
                // Para preguntas generales, simula una respuesta genérica o busca en un mapa de preguntas
                const lowerPrompt = prompt.toLowerCase();
                if (lowerPrompt.includes("guerras carlistas")) {
                    resolve("Las Guerras Carlistas fueron conflictos dinásticos que enfrentaron a los partidarios de Isabel II (liberales) contra los del infante Carlos (absolutistas o carlistas). Hubo tres guerras principales a lo largo del siglo XIX, siendo la primera la más importante para la consolidación del régimen liberal.");
                } else if (lowerPrompt.includes("constitución de cádiz")) {
                    resolve("La Constitución de Cádiz de 1812, conocida como 'La Pepa', fue la primera constitución española. Estableció principios liberales como la soberanía nacional, la división de poderes y el sufragio universal masculino indirecto. Fue un hito, aunque tuvo una aplicación intermitente.");
                } else if (lowerPrompt.includes("desastre del 98")) {
                    resolve("El 'Desastre del 98' se refiere a la derrota de España frente a Estados Unidos en 1898, lo que resultó en la pérdida de Cuba, Puerto Rico y Filipinas. Este evento generó una profunda crisis moral y un movimiento regeneracionista que cuestionó el sistema político de la Restauración.");
                }
                else {
                    resolve("Interesante pregunta. La historia del siglo XIX en España es muy compleja y rica. Por ejemplo, ¿sabías que la desamortización fue un proceso clave para la reforma agraria y la economía liberal? O, ¿qué quieres saber sobre la política de turnos de Cánovas y Sagasta?");
                }
            }
            else {
                resolve(simulatedResponses["default"]);
            }
        }, 1500); // Simula un retraso de la red
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para los botones de resumen
    const summaryButtons = document.querySelectorAll('.generate-summary-btn');
    summaryButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const period = button.dataset.period;
            const summaryDiv = document.getElementById(`summary-${period}`);
            const spinner = button.querySelector('.spinner');

            summaryDiv.classList.add('hidden'); // Ocultar resumen previo si existe
            spinner.classList.remove('hidden'); // Mostrar spinner
            button.disabled = true; // Deshabilitar botón durante la carga

            const prompt = `Genera un resumen conciso sobre la ${period.replace('-', ' ')} de España en el siglo XIX.`;
            let generatedSummary = await callGeminiAPI(prompt);

            if (generatedSummary) {
                summaryDiv.innerHTML = `<p>${generatedSummary}</p>`;
                summaryDiv.classList.remove('hidden');
            } else {
                summaryDiv.innerHTML = `<p class="text-red-700">No se pudo generar el resumen en este momento. Por favor, inténtelo de nuevo.</p>`;
                summaryDiv.classList.remove('hidden');
            }

            spinner.classList.add('hidden'); // Ocultar spinner
            button.disabled = false; // Habilitar botón
        });
    });

    // Lógica para la sección de Preguntas y Respuestas
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    const questionInput = document.getElementById('questionInput');
    const answerOutput = document.getElementById('answerOutput');
    
    askQuestionBtn.addEventListener('click', async () => {
        const question = questionInput.value.trim();
        if (!question) {
            answerOutput.innerHTML = `<p class="text-red-700">Por favor, escribe una pregunta.</p>`;
            answerOutput.classList.remove('hidden');
            return;
        }

        const spinner = askQuestionBtn.querySelector('.spinner');
        spinner.classList.remove('hidden'); // Mostrar spinner
        askQuestionBtn.disabled = true; // Deshabilitar botón
        answerOutput.classList.add('hidden'); // Ocultar respuesta previa

        const prompt = `Pregunta sobre la historia del siglo XIX en España: ${question}`;
        let answer = await callGeminiAPI(prompt);

        if (answer) {
            answerOutput.innerHTML = `<p>${answer}</p>`;
            answerOutput.classList.remove('hidden');
        } else {
            answerOutput.innerHTML = `<p class="text-red-700">No se pudo obtener una respuesta en este momento. Por favor, inténtelo de nuevo.</p>`;
            answerOutput.classList.remove('hidden');
        }

        spinner.classList.add('hidden'); // Ocultar spinner
        askQuestionBtn.disabled = false; // Habilitar botón
    });
});
