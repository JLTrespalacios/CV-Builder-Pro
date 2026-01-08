import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export const generateWord = async (cvData, t) => {
  const { personal, experience, education, hardSkills, softSkills, projects, certifications, languages, references } = cvData;

  const children = [];

  // 1. HEADER (Personal Info)
  children.push(
    new Paragraph({
      text: (personal.name || "Nombre Completo").toUpperCase(),
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  children.push(
    new Paragraph({
      text: personal.role || "Título Profesional",
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new TextRun({
            text: personal.role || "Título Profesional",
            size: 28, // 14pt
            color: "666666"
        })
      ]
    })
  );

  // Contact Info Line
  const contactParts = [];
  if (personal.email) contactParts.push(personal.email);
  if (personal.phone) contactParts.push(personal.phone);
  if (personal.location) contactParts.push(personal.location);
  if (personal.linkedin) contactParts.push("LinkedIn"); // Simplifying URL to just "LinkedIn" or show full if preferred
  if (personal.website) contactParts.push("Website");

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [new TextRun({
            text: contactParts.join(" | "),
            size: 20 // 10pt
        })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        border: {
            bottom: {
                color: "E5E7EB",
                space: 10,
                value: "single",
                size: 6
            }
        }
      })
    );
  }

  // Helper for Section Titles
  const createSectionHeading = (text) => {
    return new Paragraph({
      text: text.toUpperCase(),
      heading: HeadingLevel.HEADING_2,
      spacing: {
        before: 300,
        after: 150,
      },
      border: {
        bottom: {
          color: "000000",
          space: 1,
          value: "single",
          size: 6,
        },
      },
    });
  };

  // 2. SUMMARY
  if (personal.summary) {
    children.push(createSectionHeading(t.summary || "Resumen Profesional"));
    children.push(
      new Paragraph({
        text: personal.summary,
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: 200 },
      })
    );
  }

  // 3. EXPERIENCE
  if (experience && experience.length > 0) {
    children.push(createSectionHeading(t.experience || "Experiencia Laboral"));
    experience.forEach(exp => {
      // Role & Company
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: exp.position || "Cargo",
              bold: true,
              size: 24, // 12pt
            }),
            new TextRun({
              text: ` | ${exp.company || "Empresa"}`,
              italics: true,
            }),
          ],
          spacing: { before: 100 }
        })
      );
      
      // Dates
      const dateText = `${exp.startDate || ""} - ${exp.current ? (t.present || "Presente") : (exp.endDate || "")}`;
      children.push(
        new Paragraph({
          text: dateText,
          alignment: AlignmentType.LEFT,
          spacing: { after: 100 },
          children: [
              new TextRun({
                  text: dateText,
                  color: "666666",
                  size: 20
              })
          ]
        })
      );

      // Description
      if (exp.description) {
        children.push(
          new Paragraph({
            text: exp.description,
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200 },
          })
        );
      }
    });
  }

  // 4. EDUCATION
  if (education && education.length > 0) {
    children.push(createSectionHeading(t.education || "Educación"));
    education.forEach(edu => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: edu.degree || "Título",
              bold: true,
              size: 24,
            }),
            new TextRun({
              text: ` | ${edu.school || "Institución"}`,
              italics: true,
            }),
          ],
          spacing: { before: 100 }
        })
      );
       const dateText = `${edu.startDate || ""} - ${edu.endDate || ""}`;
       children.push(
        new Paragraph({
          text: dateText,
          children: [
            new TextRun({
                text: dateText,
                color: "666666",
                size: 20
            })
          ],
          spacing: { after: 100 },
        })
      );
      if (edu.description) {
          children.push(
              new Paragraph({
                  text: edu.description,
                  alignment: AlignmentType.JUSTIFIED,
                  spacing: { after: 150 }
              })
          );
      }
    });
  }

  // 5. HARD SKILLS
  if (hardSkills && hardSkills.length > 0) {
    children.push(createSectionHeading(t.hardSkills || "Habilidades Técnicas"));
    const hardSkillText = hardSkills.map(s => s.name || s).join(", ");
    children.push(
        new Paragraph({ 
            text: hardSkillText, 
            spacing: { after: 200 } 
        })
    );
  }

  // 6. SOFT SKILLS
  if (softSkills && softSkills.length > 0) {
    children.push(createSectionHeading(t.softSkills || "Habilidades Blandas"));
    const softSkillText = softSkills.map(s => s.name || s).join(", ");
    children.push(
        new Paragraph({ 
            text: softSkillText, 
            spacing: { after: 200 } 
        })
    );
  }

  // 7. PROJECTS
   if (projects && projects.length > 0) {
    children.push(createSectionHeading(t.projects || "Proyectos"));
    projects.forEach(proj => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: proj.name || "Nombre del Proyecto",
              bold: true,
              size: 24
            }),
          ],
          spacing: { before: 100 }
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            text: proj.description,
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 100 },
          })
        );
      }
      if (proj.link) {
          children.push(
              new Paragraph({
                  text: proj.link,
                  style: "Hyperlink",
                  spacing: { after: 200 }
              })
          )
      }
    });
  }

  // 8. LANGUAGES
  if (languages && languages.length > 0) {
      children.push(createSectionHeading(t.languages || "Idiomas"));
      languages.forEach(lang => {
          children.push(
              new Paragraph({
                  text: `${lang.language} - ${lang.level}`,
                  spacing: { after: 50 }
              })
          );
      });
  }

  // 9. CERTIFICATIONS
  if (certifications && certifications.length > 0) {
      children.push(createSectionHeading(t.certifications || "Certificaciones"));
      certifications.forEach(cert => {
          children.push(
              new Paragraph({
                  children: [
                      new TextRun({
                          text: cert.name || "Certificación",
                          bold: true,
                      }),
                      new TextRun({
                          text: ` - ${cert.issuer || "Emisor"}`,
                          italics: true,
                      })
                  ],
                  spacing: { after: 50 }
              })
          );
          if (cert.date) {
               children.push(
                  new Paragraph({
                      text: cert.date,
                      alignment: AlignmentType.RIGHT,
                      spacing: { after: 50 }
                  })
              );
          }
      });
  }

  // 10. REFERENCES
  if (references && references.length > 0) {
      children.push(createSectionHeading(t.references || "Referencias"));
      references.forEach(ref => {
          children.push(
              new Paragraph({
                  text: ref.name || "Nombre",
                  bold: true,
                  spacing: { after: 50 }
              })
          );
          const details = [];
          if (ref.company) details.push(ref.company);
          if (ref.phone) details.push(ref.phone);
          if (ref.email) details.push(ref.email);
          
          if (details.length > 0) {
               children.push(
                  new Paragraph({
                      text: details.join(" | "),
                      spacing: { after: 150 }
                  })
              );
          }
      });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${(personal.name || "cv").replace(/\s+/g, "_")}_resume.docx`);
};
