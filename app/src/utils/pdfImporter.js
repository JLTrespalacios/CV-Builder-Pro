import * as pdfjsLib from 'pdfjs-dist';

// Configure worker using a CDN to avoid build configuration issues
// We use the version matching the installed library
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

/**
 * Extracts all text from a PDF file
 * @param {File} file - The PDF file object
 * @returns {Promise<string>} - The full text content of the PDF
 */
export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    
    // Iterate through all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      // Extract text items and join them with spaces
      // We look at 'hasEOL' to try and respect line breaks, but PDF text extraction is often messy
      const pageText = textContent.items.map(item => {
        return item.str + (item.hasEOL ? '\n' : ' ');
      }).join('');
      
      fullText += pageText + '\n\n';
    }
    
    return fullText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('No se pudo leer el archivo PDF. Asegúrate de que no esté protegido con contraseña.');
  }
};
