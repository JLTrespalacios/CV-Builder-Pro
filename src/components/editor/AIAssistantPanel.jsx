import React, { useState } from 'react';
import { Copy, Check, Bot, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { AI_RECRUITER_PROMPT } from '../../constants/aiPersona';
import { useUIStore } from '../../store/uiStore';

const AIAssistantPanel = () => {
  const { cvData } = useCVStore();
  const { addToast } = useUIStore();
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const candidateContext = `
📌 CONTEXTO DEL CANDIDATO (DATOS ACTUALES):
Nombre: ${cvData.personal.name} ${cvData.personal.lastName || ''}
Rol: ${cvData.personal.role}
Nivel Profesional: ${cvData.personal.professionalLevel || 'No especificado'}
Email: ${cvData.personal.email}
Ubicación: ${cvData.personal.location}
Resumen actual: ${cvData.personal.summary}

EXPERIENCIA:
${cvData.experience.map(exp => `
- Empresa: ${exp.company}
- Rol: ${exp.position}
- Fechas: ${exp.duration}
- Descripción actual: ${exp.description}
`).join('\n')}

EDUCACIÓN:
${cvData.education.map(edu => `
- Institución: ${edu.school}
- Título: ${edu.degree}
- Año: ${edu.year}
`).join('\n')}

HABILIDADES TÉCNICAS (Hard Skills):
${cvData.hardSkills.join(', ')}

HABILIDADES BLANDAS (Soft Skills):
${cvData.softSkills.join(', ')}

PROYECTOS:
${cvData.projects.map(proj => `
- Nombre: ${proj.name}
- Descripción: ${proj.description}
- Link: ${proj.link}
`).join('\n')}
    `;

    return `${AI_RECRUITER_PROMPT}\n\n${candidateContext}\n\nPor favor, optimiza este perfil siguiendo tus instrucciones de Reclutador Senior.`;
  };

  const handleCopy = () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    addToast('Prompt copiado al portapapeles', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 pb-20 min-w-[350px] animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-main)] tracking-tight">Asistente IA</h2>
          <p className="text-sm text-[var(--text-secondary)]">Reclutador Senior Virtual</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 mb-8">
        <div className="flex items-start gap-4 mb-4">
          <Sparkles className="text-purple-600 mt-1 shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">Optimiza tu CV con Inteligencia Artificial</h3>
            <p className="text-sm text-purple-800/80 leading-relaxed">
              Hemos configurado un <strong>Prompt de Reclutador Senior</strong> diseñado para pasar filtros ATS y destacar tus logros. 
              Como esta es una aplicación web local, utilizamos tu IA favorita (ChatGPT, Claude, Gemini) para procesar los datos.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h3 className="font-medium text-slate-700 flex items-center gap-2">
              <MessageSquare size={16} />
              Tu Prompt Personalizado
            </h3>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Listo para usar</span>
          </div>
          
          <div className="p-4 bg-slate-50/50">
            <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Instrucciones:</div>
            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2 mb-4 ml-1">
              <li>Haz clic en el botón <strong>Copiar Prompt</strong> abajo.</li>
              <li>Abre tu chat de IA preferido (ChatGPT, Claude, DeepSeek).</li>
              <li>Pega el texto y envía el mensaje.</li>
              <li>Copia el resultado optimizado y pégalo de vuelta en el editor de tu CV.</li>
            </ol>
            
            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                copied 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-[1.02]' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copiar Prompt Optimizado
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <a 
            href="https://chat.openai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-green-300 hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ExternalLink size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700">ChatGPT</span>
          </a>
          
          <a 
            href="https://claude.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ExternalLink size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700">Claude</span>
          </a>

          <a 
            href="https://gemini.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ExternalLink size={16} />
            </div>
            <span className="text-sm font-medium text-slate-700">Gemini</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
