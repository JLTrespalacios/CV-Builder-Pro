import React, { useState } from 'react';
import { Copy, Check, Bot, Sparkles, MessageSquare, ExternalLink, BrainCircuit, Wand2, Send, Loader2 } from 'lucide-react';
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
    <div className="p-6 lg:p-8 min-w-[350px] max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Asistente IA</h2>
          <p className="text-sm text-slate-500">Reclutador Senior Virtual</p>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-purple-100/50 rounded-2xl shadow-xl shadow-purple-500/5 p-6 mb-8 relative z-20 overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <BrainCircuit size={100} className="text-purple-600" />
        </div>
        
        <div className="flex items-start gap-4 mb-4 relative z-10">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-purple-900 mb-1">Optimiza tu CV</h3>
            <p className="text-sm text-purple-800/80 leading-relaxed">
              Hemos configurado un <strong>Prompt de Reclutador Senior</strong> para destacar tus logros y pasar filtros ATS usando tu IA favorita.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <h3 className="font-bold text-slate-700 flex items-center gap-2 text-sm uppercase tracking-wider">
              <MessageSquare size={14} className="text-slate-400" />
              Tu Prompt Personalizado
            </h3>
            <span className="text-[10px] font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">LISTO</span>
          </div>
          
          <div className="p-5 bg-white/50">
            <div className="text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">Instrucciones</div>
            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-3 mb-6 ml-1 marker:text-purple-500 marker:font-bold">
              <li>Copia el prompt con el botón de abajo.</li>
              <li>Abre tu chat de IA preferido.</li>
              <li>Pega el texto y envía el mensaje.</li>
              <li>Pega el resultado optimizado en tu CV.</li>
            </ol>
            
            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
                copied 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-500/30 ring-2 ring-green-600 ring-offset-2' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 hover:-translate-y-1'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  ¡Copiado al portapapeles!
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
          {[
            { name: 'ChatGPT', url: 'https://chat.openai.com', color: 'green', icon: <ExternalLink size={16} /> },
            { name: 'Claude', url: 'https://claude.ai', color: 'orange', icon: <ExternalLink size={16} /> },
            { name: 'Gemini', url: 'https://gemini.google.com', color: 'blue', icon: <ExternalLink size={16} /> }
          ].map((ai) => (
            <a 
              key={ai.name}
              href={ai.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition-all group relative overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-${ai.color}-50 opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className={`w-8 h-8 rounded-full bg-${ai.color}-100 text-${ai.color}-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform relative z-10`}>
                {ai.icon}
              </div>
              <span className="text-sm font-bold text-slate-700 relative z-10">{ai.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPanel;
